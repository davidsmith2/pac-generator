module.exports = function (grunt) {
    grunt.registerTask('web', 'launch web server and watch tasks', ['build', 'parallel:web']);
};