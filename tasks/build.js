module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean',
        'build-non-js',
        'coffee',
        'browserify'
    ]);
};