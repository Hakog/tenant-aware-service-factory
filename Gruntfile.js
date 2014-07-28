'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    mochaTest: {
      tenantserviceFactory: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};