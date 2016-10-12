module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:dist',
        'bootlint',
        'copy',
        'less',
        'browserify'
    ]);
};