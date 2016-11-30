module.exports = function (grunt) {
    grunt.registerTask('predeploy', [
        'clean:predeploy',
    	'exec:predeploy:' + grunt.option('SHA1') + ':' + 'common-services.yml',
        'zip:predeploy'
    ]);
};
