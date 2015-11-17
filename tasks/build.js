module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean',
        'bootlint',
        'copy',
        'less',
        'browserify',
        'zip:deploy'
    ]);
};