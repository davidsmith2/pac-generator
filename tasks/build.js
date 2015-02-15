module.exports = function (grunt) {
    grunt.registerTask('build', [
        'bootlint',
        'clean',
        'copy',
        'coffee',
        'browserify'
    ]);
};