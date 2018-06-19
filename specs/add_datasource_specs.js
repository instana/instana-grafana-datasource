const chai = require('chai');
const expect = chai.expect;
const puppeteer = require('puppeteer');

describe('When adding the Instana datasource to Grafana', function() {
  this.timeout(10000);

  it('should successfully connect to the Instana API', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // For some reason even after waiting for the port to be open on the container we cannot immediately hit the page
    await page.waitFor(500);

    await page.goto('http://localhost:3000');
    await page.type('input[name=username]', 'admin');
    await page.type('input[name=password]', 'admin');
    await page.click('.btn'); // TODO: better selector
    await page.waitForSelector('a.btn.progress-step-cta');
    await page.click('.progress-link');
    await page.goto('http://localhost:3000/datasources/new?gettingstarted');
    await page.waitForSelector('select[ng-model="ctrl.current.type"]');
    await page.select('select[ng-model="ctrl.current.type"]', 'string:instana-datasource');

    // Generate random datasource name to allow for multiple runs without refreshing Grafana.
    let runId = randomString(6);
    await page.type('input[ng-model="ctrl.current.name"]', 'puppeteer-test-' + runId);
    await page.type('input[ng-model="ctrl.current.jsonData.url"]', process.env.INSTANA_UI_BACKEND_URL);
    await page.type('input[ng-model="ctrl.current.jsonData.apiToken"]', process.env.INSTANA_API_TOKEN);
    await page.click('.btn'); // TODO: better selector

    // waitForSelector doesn't work for some reason so we'll do with a sleep for now
    await page.waitFor(2500);

    const alerts = await page.evaluate((sel) => {
      return [
        document.querySelectorAll(sel)[0].innerText,
        document.querySelectorAll(sel)[1].innerText
      ];
    }, 'div.alert-title');

    expect(alerts[0]).to.be.equal('Datasource added');
    expect(alerts[1]).to.be.equal('Successfully connected to the Instana API.');

    await browser.close();
  });
});

function randomString(length) {
  var result = '';
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

