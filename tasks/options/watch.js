module.exports = {
    expressWeb: {
        files: [
            'src/**/*.js',
            '!src/public/**/*.js',
            'src/views/**/*.jade'
        ],
        tasks: ['express:web'],
        options: {
            atBegin: true,
            spawn: false
        }
    },
    less: {
        files: ['src/public/css/**/*.less', '!src/public/css/lib/**/*.less'],
        tasks: ['less']
    },
    bootlint: {
        files: ['src/public/js/**/*.hbs'],
        tasks: ['bootlint']
    },
    browserify: {
        files: ['src/public/js/**/*.coffee'],
        tasks: ['browserify:app']
    },
    livereload: {
        files: ['dist/public/css/**/*', 'dist/public/js/**/*'],
        options: {
            livereload: true
        }
    }
};
