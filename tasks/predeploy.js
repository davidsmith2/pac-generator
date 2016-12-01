'use strict';

module.exports = (grunt) => {
	var tag = grunt.option('SHA1');
    grunt.registerTask('predeploy', [
        'clean:predeploy',
    	`exec:predeploy:${tag}:common-services.yml`,
    	'sed:predeploy',
        'zip:predeploy'
    ]);
};
