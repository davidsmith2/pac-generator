module.exports = function (grunt) {
    grunt.registerTask('predeploy', [
        'clean:predeloy',
    	'exec:predeloy:' + grunt.option('SHA1') + ':' + 'common-services.yml',
        'zip:predeloy'
    ]);
};
