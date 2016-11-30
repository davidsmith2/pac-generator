module.exports = function (grunt) {
    grunt.registerTask('deploy', [
    	'exec:docker:' + grunt.option('SHA1') + ':' + 'common-services.yml'
        'clean',
        'zip'
    ]);
};
