module.exports = function (grunt) {
    grunt.registerTask('deploy', [
        'clean',
        'zip',
    	'awsebtdeploy'
    ]);
};
