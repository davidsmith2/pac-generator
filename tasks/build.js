module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:build',
        'copy:css',
        'copy:fonts',
        'copy:pac',
        'browserify'
    ]);
};