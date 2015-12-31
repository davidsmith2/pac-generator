module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:build',
        'bootlint',
        'copy',
        'less',
        'browserify'
    ]);
};