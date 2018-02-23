# PLEASE NOTE: all development related information regarding this plugin should go here and NOT in the README as the README is packaged and published to the Grafana plugin repository and visible publicly on the Grafana website.

## Instana Data Source For Grafana

This plugin is a so-called datasource plugin for Grafana and connects to the Instana API. End-users can create visualizations in Grafana for metrics on snapshots.

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

### Getting Started

1. Make sure `yarn` is installed (everything should work also with npm but YMMV)
2. Install realpath and timeout
3. Run `yarn install`.
4. Optionally, make sure grunt is installed globally.
5. Run `yarn run startup`
6. Goto http://localhost:3000 and login with admin/admin. Click 'Add data source' and select 'Instana' from the types dropdown. The mountebank server runs default at http://localhost:8010 and the only valid api token is 'valid-api-token'.

Changes should be made in the `src` directory. The build task transpiles the TypeScript code into JavaScript and copies it to the `dist` directory. Grafana will load the JavaScript from the `dist` directory and ignore the `src` directory. The `dist` directory is bind mounted in the Grafana container.

After you made changes you should run `yarn run refresh` to see those changes reflected in your Grafana docker container. This will also trigger a build of the mountebank container which copies the imposters file from /specs/mb/importers into the container. If the container doesn't come up subscribing to docker events might reveal the error (`docker events &`).

### Publishing On Grafana.com

- The plugin id field in the plugin.json file should be unique and should follow the plugin naming convention: `yourorgname-pluginname-datasource`.
- If the plugin supports annotations, then change the annotations field in the plugin.json file to `true`.
- Image links in the plugin are relative to the plugin.json file.
- Everywhere a class is named ChangeMyName, change it your plugin name.
- Commit the `dist` directory to Git. Grafana cannot build plugins when loading them and will load the JavaScript in the dist directory if it exists.
- The README.md should not contain HTML, only Markdown.
- If the README.md file contains links to images, they should be the GitHub link to the image. For example: `https://raw.githubusercontent.com/yourorg/pluginname-datasource/master/src/img/image_name.png`

### Unit Testing with Karma and Mocha and ExpectJS

The Karma configuration uses the SystemJS TypeScript plugin to load files from the src directory and transpile them on the fly. It also uses some simple fakes in the Mocks package so that you can unit test properly.

The settings for Karma are in the karma.conf.js file in the root. If you add any external files, then they need to be added to the SystemJS section to be used in tests.

`yarn test` will start the karma runner and execute all tests in the specs folder.
