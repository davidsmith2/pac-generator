module.exports = function (grunt) {
    grunt.registerTask('deploy', [
        'zip:dev',
        'awsebtdeploy:dev'
    ]);
};