**PLEASE NOTE: All development related information regarding this plugin should go here and NOT in the README as the README is packaged and published to the Grafana plugin repository and visible publicly on the Grafana website.**

# Contributing

This plugin is a datasource plugin for Grafana and connects to the Instana API. End-users can create visualizations in Grafana for metrics on snapshots.

This plugin includes:

- Karma and mocha for unit testing in TypeScript, puppeteer for browser based testing with chrome headless.
- Mocks for testing and TypeScript typings to be able to compile the plugin.
- A Grunt build script to build the plugin.

The following yarn run scripts are available. You can also run them via Grunt directly. Running them through yarn (which will then use the locally installed grunt dependency of the package) is the preferred way, when running them via Grunt directly you would need to install Grunt globally via `yarn global add grunt`.

- `yarn run build` (runs the `grunt` default task) should run before every commit. It cleans the dist directory, executes the unit tests (building TypeScript on-the-fly), copies sources to the dist folder, transpiles TypeScript to javascript, copies static assets to the dist folder, builds the mountebank container, starts the grafana and the mountebank container, executes the functional tests and stops the containers afterwards.
- `yarn test` (`grunt unit`) executes unit tests once.
- `yarn run unit` alias for yarn test
- `yarn run unit-watch` starts karma and keeps it running with file watcher enabled so that it reruns all the tests automatically when a file changes (to be used with yarn run watch, see below).
- `yarn run watch` (`grunt watch`) will build the TypeScript files and copy everything to the dist directory automatically when a file changes. This is useful for when working on the code. To be used with `yarn run unit-watch` (see above).
- `yarn run startup` (`grunt startup`) same as the default task but keeps the containers running.
- `yarn run shutdown` (`grunt shutdown`) stops the containers.
- `yarn run refresh` (`grunt refresh`) same as default but stops running containers first.
- `yarn run functional` (`grunt functional`) (also available via ) executes the functional tests. Assumes that the grafana container is running. UI backend and api token are resolved respectively by the INSTANA_UI_BACKEND_URL and the INSTANA_API_TOKEN environment variables.

## Getting Started

1. Make sure `yarn` is installed (everything should work also with npm but YMMV)
2. Install realpath and timeout (`brew install coreutils`, remember to put them on the `$PATH`: `export PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"`)
3. Run `yarn install`.
4. Optionally, make sure grunt is installed globally.
5. Run `yarn run startup`
6. Goto http://localhost:3000 and login with admin/admin. Click 'Add data source' and select 'Instana' from the types dropdown. The mountebank server runs default at http://localhost:8010 and the only valid api token is 'valid-api-token'.

Changes should be made in the `src` directory. The build task transpiles the TypeScript code into JavaScript and copies it to the `dist` directory. Grafana will load the JavaScript from the `dist` directory and ignore the `src` directory. The `dist` directory is bind mounted in the Grafana container.

After you made changes you should run `yarn run refresh` to see those changes reflected in your Grafana docker container. This will also trigger a build of the mountebank container which copies the imposters file from /specs/mb/importers into the container. If the container doesn't come up subscribing to docker events might reveal the error (`docker events &`).

## Unit Testing with Karma and Mocha

The Karma configuration uses the SystemJS TypeScript plugin to load files from the src directory and transpile them on the fly. It also uses some simple fakes in the Mocks package so that you can unit test properly.

The settings for Karma are in the karma.conf.js file in the root. If you add any external files, then they need to be added to the SystemJS section to be used in tests.

`yarn test` will start the karma runner and execute all tests in the specs folder.

## Screenshots

The actual screenshots are from "Quick Check" example below. Do not delete old screenshots. Grafana uses those in order to display older README versions (hardcoded links).

## Publishing a New Version

* Run `yarn install`.
* Run the full build with `yarn build`.
* Make sure that the quick check scenario described below works against:
* - mountebank
* - test-instana (with proxy)
* - qa-onprem (without proxy)
* Update `src/plugin.json` with the new version number and the version date.
* Run the full build again, this should update `dist/plugin.json`.
* Commit this with a matching commit message (like `Bumped version to x.x.x`) and push this commit.
* Note the commit hash of this commit (to extend repo.json in plugin-repository).
* Tag your version with `git tag -a vx.x.x -m "plugin x.x.x" $commit && git push origin vx.x.x`
* If you haven't already, `git clone github.com:instana/grafana-plugin-repository.git`
* `cd grafana-plugin-repository`
* If you haven't already, `git remote add grafana git@github.com:grafana/grafana-plugin-repository.git`.
* `git checkout master && git pull && git fetch grafana && git merge grafana/master --ff`
* Create a branch for the new release (`instana-datasource-plugin-x.x.x`) and add the new version to `repo.json`.
* Commit, push and create a PR `Instana datasource plugin x.x.x` at <https://github.com/grafana/grafana-plugin-repository>

### Quick Check

This procedure is used to test the Instana Grafana data source before the version update PR is accepted by Grafana. That is, directory names as `instana-datasource` are valid in a Grafana workspace with this plugin installed, not in this repository. To run this scenario directly in this repository, simply omit `cd instana-datasource` and replace `docker-compose up mountebank` by `docker-compose up`.

* `cd instana-datasource`
* the Grafana server needs to run at `http://localhost:3000` for the the Instana datasource
* `docker-compose up mountebank`
* Create a datasource for Instana in Grafana
    * URL with proxy (Grafana 5.3+): `http://mountebank:8010`
    * URL with out proxy (Grafana <5.3): `http://localhost:8010`
    * API Token: `valid-api-token`
* Create a new dashboard with a graph panel

#### Built-in metrics
* Category: `Infrastructure built-in metrics`
* Query: `filler`
* Type: `Process`
* Metric: `Virtual (mem.virtual)`
* Legend format: ``

This should render a chart with two datasets (`node (on host "host-1")` and `node (on host "host-2)`).

#### Custom metrics
* Category: `Infrastructure custom metrics`
* Query: `filler`
* Type: `Dropwizard`
* Filter metric select: `kpi`
* Metric: `Dropwizard meter (KPI.errors)`
* Legend format: `$host ($pid)`

This should render a chart with one dataset (`host-3 (29042)`).

##### Aggregation selection for Visualizations
Switching the Visualization for the custom metric above to `Singlestat` and `Gauge` or `Table` will additional add an aggregation selection to Metric dropdown. Switch back to "Graph" visualization to continue.

#### Analyze application calls
* Category: `Analyze application calls`
* Application: `AWS instances`
* Group by: `endpoint.name`
* Metric: `Call latency (latency)` `MEAN`
* Legend format: ``

This should render a chart with one dataset (`GET (AWS instances) latency.mean`).

#### Analyze websites
* Category: `Analyze websites`
* Website: `www.instana.com`
* Type: `Page Loads`
* Group by: `beacon.page.name`
* Metric: `Beacon Count (beaconCount)`
* Legend format: ``

This should render a chart with one dataset (`home (www.instana.com) beaconCount.sum.300`).
