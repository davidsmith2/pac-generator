module.exports = {
    less: {
        files: ['src/css/**/*.less', '!src/css/lib/**/*.less'],
        tasks: ['less']
    },
    bootlint: {
        files: ['src/js/**/*.hbs'],
        tasks: ['bootlint']
    },
    browserify: {
        files: ['src/js/**/*.coffee'],
        tasks: ['browserify:app']
    },
    livereload: {
        files: ['dist/css/**/*', 'dist/js/**/*'],
        options: {
            livereload: true
        }
    }
};
