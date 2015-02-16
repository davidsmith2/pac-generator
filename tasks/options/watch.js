module.exports = {
    backend: {
        files: [
            'backend/**/*.jade',
            'backend/**/*.js'
        ],
        tasks: ['express:web'],
        options: {
            atBegin: true,
            spawn: false
        }
    },
    coffee: {
        files: [
            'frontend/js/**/*.coffee'
        ],
        tasks: ['browserify']
    },
    hbs: {
        files: [
            'frontend/js/**/*.hbs'
        ],
        tasks: ['bootlint', 'browserify']
    },
    less: {
        files: [
            'frontend/css/*.less',
            'frontend/css/**/*.less'
        ],
        tasks: ['less']
    },
    livereload: {
        files: [
            'build/css/**/*',
            'build/js/**/*'
        ],
        options: {
            livereload: true
        }
    },
};