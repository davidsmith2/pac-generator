module.exports = function (grunt) {
    grunt.registerTask('deploy', [
        'clean:deploy',
        'zip:deploy',
    	'awsebtdeploy:deploy'
    ]);
};
