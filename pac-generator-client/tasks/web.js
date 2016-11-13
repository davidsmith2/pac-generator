module.exports = function (grunt) {
    grunt.registerTask('web', ['build', 'parallel:web']);
};