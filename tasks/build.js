module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:build',
        'build-non-js',
        'coffee',
        'browserify'
    ]);
};