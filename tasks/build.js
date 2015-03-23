module.exports = function (grunt) {
    grunt.registerTask('build', [
        'bootlint',
        'clean:build',
        'copy',
        'less',
        'browserify'
    ]);
};