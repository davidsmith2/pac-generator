module.exports = function (grunt) {
    grunt.registerTask('release', ['clean:release', 'copy:pac']);
};