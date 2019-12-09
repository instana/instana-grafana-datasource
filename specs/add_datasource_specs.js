const chai = require('chai');
const expect = chai.expect;
const puppeteer = require('puppeteer');

describe('When adding the Instana datasource to Grafana', function() {

  // Set default values for back end URL and API token. Those will only work for the mountebank server.
  const instanaUiBackendUrl = process.env.INSTANA_UI_BACKEND_URL || 'http://mountebank:8010'; // to support docker link
  const instanaApiToken = process.env.INSTANA_API_TOKEN || 'valid-api-token';

  this.timeout(10000);

  it('should successfully connect to the Instana API', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // For some reason even after waiting for the port to be open on the container we cannot immediately hit the page
    await page.waitFor(500);

    await page.goto('http://localhost:3000/login');
    await page.type('input[name=user]', 'admin');
    await page.type('input[name=password]', 'admin');
    const logInButton = await page.waitForXPath('//button[contains(text(),"Log In")]');
    logInButton.click();
    await page.waitFor(1000); // don't ask
    const saveNewButton = await page.waitForXPath('//button[contains(text(),"Save")]');
    await page.type('input[name=newPassword]', 'admin');
    await page.type('input[name=confirmNew]', 'admin');
    saveNewButton.click();
    await page.waitFor(1000); // don't ask
    await page.goto('http://localhost:3000/datasources/new?gettingstarted');

    const installButton = await page.waitForXPath('//div//span[contains(text(),"Instana")]');
    installButton.click();
    await page.waitFor(1000); // don't ask

    // Generate random datasource name to allow for multiple runs without refreshing Grafana.
    let runId = randomString(6);
    // await page.type('input[ng-model="ctrl.current.name"]', instanaUiBackendUrl + "-" + runId);
    await page.type('input[ng-model="ctrl.current.jsonData.url"]', instanaUiBackendUrl);
    await page.type('input[ng-model="ctrl.current.jsonData.apiToken"]', instanaApiToken);
    const saveAndTestButton = await page.waitForXPath('//button[contains(text(),"Save & Test")]');
    saveAndTestButton.click();

    // waitForSelector doesn't work for some reason so we'll do with a sleep for now
    await page.waitFor(2500);

    const alerts = await page.evaluate((sel) => {
      return [
        document.querySelectorAll(sel)[0].innerText,
        document.querySelectorAll(sel)[1].innerText
      ];
    }, 'div.alert-title');

    expect(alerts[0]).to.be.equal('Datasource updated');
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
