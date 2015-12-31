module.exports = function (grunt) {
    grunt.registerTask('pre-commit', [
        'clean:deploy',
        'zip:deploy',
        'gitadd'
    ]);
};