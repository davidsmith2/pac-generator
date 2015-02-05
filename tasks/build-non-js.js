module.exports = function (grunt) {
    grunt.registerTask('build-non-js', [
        'copy:css',
        'copy:fonts',
        'copy:hbs',
        'copy:pac'
    ]);
};