'use strict';

module.exports = (grunt) => {
	const execTask = `exec:predeploy:${grunt.option('SHA1')}:common-services.yml`;
    grunt.registerTask('predeploy', [
        'clean:predeploy',
    	execTask,
        'zip:predeploy'
    ]);
};
