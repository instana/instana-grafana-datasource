**PLEASE NOTE: All development related information regarding this plugin should go here and NOT in the README as the README is packaged and published to the Grafana plugin repository and visible publicly on the Grafana website.**

# Contributing

This plugin is a datasource plugin for Grafana and connects to the Instana API.
End-users can create visualizations in Grafana for metrics on snapshots.

This plugin includes:
- Jest for unit and integration testing
- Mocks for testing and TypeScript typings to be able to compile the plugin.

This plugin makes heavily use of the toolkit provided by Grafana to build a datasource. The following yarn run scripts are available
- `yarn build` (runs `grafana-toolkit plugin:build`) should run before every commit. It cleans the dist directory, executes the unit tests (building TypeScript on-the-fly), copies sources to the dist folder, transpiles TypeScript to javascript, copies static assets to the dist folder.
- `yarn dev` (runs `grafana-toolkit plugin:dev`)
- `yarn format` (runs `prettier src/**/*.ts --write`)
- `yarn test` (runs `grafana-toolkit plugin:test`)
- `yarn watch` (runs `grafana-toolkit plugin:dev --watch`)
- `yarn up` (runs `docker-compose up --remove-orphans`)
- `yarn start` (runs `yarn up -d; yarn watch`) this will essentially run your Grafana server locally and also a Mountebank server to emulate Instana server responses

UI backend and api token are resolved respectively by the INSTANA_UI_BACKEND_URL and the INSTANA_API_TOKEN environment variables.

## Getting Started

1. Make sure `yarn` is installed (everything should work also with npm but YMMV)
2. Install realpath and timeout (`brew install coreutils`, remember to put them on the `$PATH`: `export PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"`)
3. Make sure environment variables are set through file: create a file called `setEnvVars.js` in the root of the repository. Insert environment variables as:

```
process.env.INSTANA_BACKEND_URL = 'http://localhost:8010';
process.env.INSTANA_API_TOKEN = 'valid-api-token';
```

This will run integration tests against a certain tenant unit of Instana.

4. Built the projec via `docker built`
5. Run `yarn start`
6. Goto http://localhost:3000 and login with admin/admin. A default Instana datasource was allready added using the provided env variables. The mountebank server runs default at http://localhost:8010 and the only valid api token is 'valid-api-token'.

Changes should be made in the `src` directory. The build task transpiles the TypeScript code into JavaScript and copies it to the `dist` directory. Grafana will load the JavaScript from the `dist` directory and ignore the `src` directory. The `dist` directory is bind mounted in the Grafana container.

You should run `yarn watch` to directly see your changes reflected in your Grafana docker container. This will also trigger a build of the mountebank container which copies the imposters file from /specs/mb/importers into the container. If the container doesn't come up subscribing to docker events might reveal the error (`docker events &`).

## Pushing changes

Before making a pull request or pushing content please make sure the project builds properly. For that, run `yarn build` before committing. There is a chance there will be linting errors. You can fix most of them via `yarn format`. If not, please correct them in your preferred way, either manually or via another linting tool.

## Unit Testing with Karma and Mocha

The Karma configuration uses the SystemJS TypeScript plugin to load files from the src directory and transpile them on the fly. It also uses some simple fakes in the Mocks package so that you can unit test properly.

The settings for Karma are in the karma.conf.js file in the root. If you add any external files, then they need to be added to the SystemJS section to be used in tests.

`yarn test` will start the karma runner and execute all tests in the specs folder.

## Screenshots

The actual screenshots are from "Quick Check" example below. Do not delete old screenshots. Grafana uses those in order to display older README versions (hardcoded links).

## Publishing a New Version

* Before publishing a new version ask yourself the question: did I introduce a change that might require some kind of documentation? Is one of the gifs provided in the current README obsolete due to some visual improvements? If so, please change the README accordingly. 
* Run `yarn install`.
* Run the full build with `yarn build`.
* Make sure that the quick check scenario described below works against:
* - mountebank
* - test-instana.pink (with proxy)
* - qa-onprem (without proxy)
* Update `src/plugin.json` with the new version number and the version date.
* Run the full build again, this should update `dist/plugin.json`.
* Commit this with a matching commit message (like `Bumped version to x.x.x`) and push this commit.
* Note the commit hash of this commit (to extend repo.json in plugin-repository).
* Tag your version with `git tag -a vx.x.x -m "plugin x.x.x" $commit && git push origin vx.x.x`
* If you haven't already, `git clone github.com:instana/grafana-plugin-repository.git`
* `cd ../grafana-plugin-repository`
* If you haven't already, `git remote add grafana git@github.com:grafana/grafana-plugin-repository.git`.
* `git checkout master && git fetch && git pull && git fetch grafana && git merge grafana/master --ff`
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

This should render a chart with two datasets (`node (on host "host-1")` and `node (on host "host-2)`).

#### Custom metrics
* Category: `Infrastructure custom metrics`
* Query: `filler`
* Type: `Dropwizard`
* Add filter metric select
* 1. Filter metric select: `kpi`
* Metric: `Dropwizard meter (KPI.errors)`
* Show Advanced Settings
* Legend format: `$host ($pid)`

This should render a chart with one dataset (`host-3 (29042)`).

##### Aggregation selection for Visualizations
(deprecated) Switching the Visualization for the custom metric above to `Stat` and `Gauge` or `Table` will additional add an aggregation selection to Metric dropdown. Switch back to "Graph" visualization to continue.

#### Application metrics
* Category: `Application/Service/Endpoint metrics`
* Application: `AWS instances`
* Service: `-- No Service Filter --`
* Endpoint: `-- No Endpoint Filter --`
* Metric: `Call latency (latency)`

This should render a chart with one dataset (`AWS instances (AWS instances) - latency.mean`).

#### Service metrics
* Category: `Application/Service/Endpoint metrics`
* Application: `-- No Application Filter --`
* Service: `AWS Lambda Service`
* Endpoint: `-- No Endpoint Filter --`
* Metric: `Call latency (latency)`

This should render a chart with one dataset (`AWS Lambda Service (AWS Lambda Service) - latency.mean`).

#### Endpoint metrics
* Category: `Application/Service/Endpoint metrics`
* Application: `-- No Application Filter --`
* Service: `-- No Service Filter --`
* Endpoint: `GET /api`
* Metric: `Call latency (latency)`

This should render a chart with one dataset (`GET /api (GET /api) - latency.mean`).

#### Analyze application calls
* Category: `Analyze application calls`
* Application: `Dest` `AWS instances`
* Group by: `Dest` `endpoint.name`
* Metric: `Call latency (latency)` `MEAN`

This should render a chart with one dataset (`GET (AWS instances) latency.mean`).

#### Analyze websites
* Category: `Analyze websites`
* Website: `www.instana.com`
* Type: `Page Loads`
* Group by: `beacon.page.name`
* Metric: `Beacon Count (beaconCount)`

This should render a chart with one dataset (`home (www.instana.com) beaconCount.sum.300`).
