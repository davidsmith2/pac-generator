module.exports = function (grunt) {
    grunt.registerTask('deploy', [
        'clean',
        'sed',
        'zip',
    	'awsebtdeploy'
    ]);
};
