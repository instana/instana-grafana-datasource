const url = require('url');

module.exports = function(grunt) {

  let instanaUiBackendUrl = process.env.INSTANA_UI_BACKEND_URL;
  if (instanaUiBackendUrl) {
    // to erase docker link support with mountebank :(
    if ("http://mountebank:8010" === instanaUiBackendUrl) {
      instanaUiBackendUrl = 'http://localhost:8010';
    }
    grunt.log.writeln('✅ env var INSTANA_UI_BACKEND_URL set: ' + instanaUiBackendUrl);
  } else {
    instanaUiBackendUrl = 'http://localhost:8010';
    grunt.log.warn('⚠️ env var INSTANA_UI_BACKEND_URL not set. Will use default ' + instanaUiBackendUrl +
      '. Remember to set it for a smooth dev experience.');
  }

  if (process.env.INSTANA_API_TOKEN) {
    grunt.log.writeln('✅ env var INSTANA_API_TOKEN set.');
  } else {
    grunt.log.warn('⚠️ env var INSTANA_API_TOKEN not set. Remember to set it for a smooth dev experience.');
  }

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.initConfig({
    clean: ['dist'],

    copy: {
      dist_js: {
        expand: true,
        cwd: 'src',
        src: ['**/*.ts', '**/*.d.ts'],
        dest: 'dist'
      },
      dist_html: {
        expand: true,
        flatten: true,
        cwd: 'src/partials',
        src: ['*.html'],
        dest: 'dist/partials/'
      },
      dist_css: {
        expand: true,
        flatten: true,
        cwd: 'src/css',
        src: ['*.css'],
        dest: 'dist/css/'
      },
      dist_img: {
        expand: true,
        flatten: true,
        cwd: 'src/img',
        src: ['*.*'],
        dest: 'dist/img/'
      },
      dist_statics: {
        expand: true,
        flatten: true,
        src: ['src/plugin.json', 'LICENSE', 'README.md'],
        dest: 'dist/'
      }
    },

    tslint: {
      options: {
        // Task-specific options go here.
        configuration: "tslint.json"
      },
      files: {
          // Target-specific file lists and/or options go here.
          src: ['src/**/*.ts'],
      },
    },

    typescript: {
      build: {
        src: ['dist/**/*.ts', '!**/*.d.ts'],
        dest: 'dist',
        options: {
          module: 'system',
          target: 'es5',
          rootDir: 'dist/',
          declaration: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          sourceMap: true,
          noImplicitAny: false,
        }
      }
    },

    watch: {
      files: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/img/*.*', 'src/plugin.json', 'README.md', '*.go'],
      tasks: ['testAndCopy'],
      options: {
        debounceDelay: 250,
      },
    },

    dockerCompose: {
      options: {
        mappedComposeFile: 'docker-compose.yml',
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    run: {
      waitForGrafana: {
        cmd: './wait-for-it.sh',
        args: [
          '-h', 'localhost',
          '-p', '3000'
        ]
      },

      waitForUiBackend: {
        cmd: './wait-for-it.sh',
        args: [
          '-h', url.parse(instanaUiBackendUrl).hostname,
          '-p', url.parse(instanaUiBackendUrl).port || (url.parse(instanaUiBackendUrl).protocol === 'https:' ? '443' : '80')
        ]
      },

      functionalTests: {
        cmd: 'mocha',
        args: [
          'specs/add_datasource_specs.js'
        ]
      },

      buildGo_linux_amd64: {
        cmd: 'go',
        args: [
          'build',
          '-o', './dist/simple-plugin_linux_amd64', '.'
        ]
      },

      buildGo_darwin_amd64: {
        cmd: 'go',
        args: [
          'build',
          '-o', './dist/simple-plugin_darwin_amd64', '.'
        ]
      },

      buildGo_windows_amd64: {
        cmd: 'go',
        args: [
          'build',
          '-o', './dist/simple-plugin_windows_amd64', '.'
        ]
      },
    }
  });

  grunt.registerTask('unit', [
    'karma:unit'
  ]);

  grunt.registerTask('functional', [
    'run:functionalTests'
  ]);

  grunt.registerTask('startup', [
    'default',
    'prepareEnvironment',
    'watch'
  ]);

  grunt.registerTask('shutdown', [
    'dockerCompose:down'
  ]);

  grunt.registerTask('refresh', [
    'shutdown',
    'startup'
  ]);

  grunt.registerTask('testAndCopy', [
    'unit',
    'tslint',
    'copy:dist_js',
    'typescript:build',
    'copy:dist_html',
    'copy:dist_css',
    'copy:dist_img',
    'copy:dist_statics',
    'run:buildGo_linux_amd64',
    //'run:buildGo_darwin_amd64',
    //'run:buildGo_windows_amd64'
  ]);

  grunt.registerTask('prepareEnvironment', [
    'dockerCompose:build',
    'dockerCompose:up',
    'run:waitForUiBackend',
    'run:waitForGrafana',
    'functional'
  ]);

  grunt.registerTask('default', [
    'clean',
    'testAndCopy'
  ]);
};
