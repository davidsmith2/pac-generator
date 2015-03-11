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
    css: {
        files: [
            'frontend/css/*.less',
            'frontend/css/**/*.less'
        ],
        tasks: ['less']
    },
    html: {
        files: [
            'frontend/js/**/*.hbs'
        ],
        tasks: ['bootlint', 'browserify']
    },
    js: {
        files: [
            'frontend/js/**/*.coffee'
        ],
        tasks: ['browserify']
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