module.exports = function(grunt) {
  grunt.initConfig({

    less: {
      'docs': {
        files: {
          'out/style.css': 'lib/doc/less/ramda.less'
        }
      }
    },

    jsdoc: {
      'docs': {
        src: ['tmp/ramda.js'],
        options: {
          template: './lib/doc/jsdoc-template',
          destination: 'out/'
        }
      }
    },

    copy: {
      'docs': {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/',
          src: ['fonts/*'],
          dest: 'out'
        }, {
          src: ['tmp/ramda.js'],
          dest: 'out/docs/'
        }, {
          src: ['lib/doc/main.js'],
          dest: 'out/docs/main.js'
        }]
      }
    },

    watch: {
      docs: {
        files: ['./Gruntfile.js', './lib/doc/*', './lib/doc/jsdoc-template/*'],
        tasks: ['docs'],
        options: {
          livereload: true
        }
      },
    },

    express: {
      docs: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['./'],
          livereload: true
        }
      }
    },

    open: {
      docs: {
        path: 'http://localhost:<%= express.docs.options.port%>/docs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('docs', [
    'less:docs',
    'jsdoc:docs',
    'copy:docs'
  ]);
  grunt.registerTask('serve', [
    'express',
    'open',
    'watch'
  ]);
};
