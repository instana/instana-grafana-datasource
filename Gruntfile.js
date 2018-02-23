module.exports = function(grunt) {

  let instanaUiBackendUrl = process.env.INSTANA_UI_BACKEND_URL;
  
  if (!instanaUiBackendUrl) {
    instanaUiBackendUrl = 'http://localhost:8010';
    grunt.log.warn('Environment variable INSTANA_UI_BACKEND_URL has not been ' +
                   'set. Assuming default: ' + instanaUiBackendUrl + '.');
  } else {
    grunt.log.writeln('INSTANA_UI_BACKEND_URL is set to ' + instanaUiBackendUrl);
  }

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-run');

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
      files: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/img/*.*', 'src/plugin.json', 'README.md'],
      tasks: ['default'],
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

      waitForMountebank: {
        cmd: './wait-for-it.sh',
        args: [
          '-h', /^http:\/\/([A-Za-z0-9\.-]{3,}(?:\.[A-Za-z]{2,3})?)\:(\d+)$/gm.exec(instanaUiBackendUrl)[1], 
          '-p', /^http:\/\/([A-Za-z0-9\.-]{3,}(?:\.[A-Za-z]{2,3})?)\:(\d+)$/gm.exec(instanaUiBackendUrl)[2] || '80'
        ]
      },

      functionalTests: {
        cmd: 'mocha',
        args: [
          'specs/add_datasource_specs.js',
          '--timeout 5000'
        ]
      }
    }
  });

  grunt.registerTask('unit', [
    'karma:unit'
  ]);

  grunt.registerTask('startup', [
    'clean',
    'unit',
    'copy:dist_js',
    'typescript:build',
    'copy:dist_html',
    'copy:dist_css',
    'copy:dist_img',
    'copy:dist_statics',
    'dockerCompose:build',
    'dockerCompose:up',
    'run:waitForMountebank',
    'run:waitForGrafana',
    'functional'
  ]);

  grunt.registerTask('shutdown', [
    'dockerCompose:down'
  ]);

  grunt.registerTask('refresh', [
    'shutdown',
    'startup'
  ]);

  grunt.registerTask('functional', [
    'run:functionalTests'
  ]);

  grunt.registerTask('default', [
    'shutdown',
    'startup',
    'shutdown'
  ]);
};
