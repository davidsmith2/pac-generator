module.exports = function (grunt) {
    grunt.registerTask('deploy', [
        'clean:deploy',
        'sed:deploy',
        'zip:deploy',
    	'awsebtdeploy:deploy'
    ]);
};
