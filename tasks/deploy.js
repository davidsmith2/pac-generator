module.exports = function (grunt) {
    grunt.registerTask('deploy', [
        'clean:deploy',
        'shell:deploy',
        'zip:deploy',
    	'awsebtdeploy:deploy'
    ]);
};
