'use strict';

module.exports = (grunt) => {
  const tag = grunt.option('SHA1');
  grunt.registerTask('predeploy', [
    'clean:predeploy',
    `exec:predeploy:${tag}:common-services.yml`,
    'sed:predeploy',
    'zip:predeploy'
  ]);
};
