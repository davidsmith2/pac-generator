module.exports = {
    less: {
        files: ['src/css/**/*.less', '!src/css/lib/**/*.less'],
        tasks: ['less']
    },
    bootlint: {
        files: ['src/js/**/*.hbs'],
        tasks: ['bootlint']
    },
    livereload: {
        files: ['dist/css/**/*', 'dist/js/**/*'],
        options: {
            livereload: true
        }
    }
};
