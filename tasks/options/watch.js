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
        tasks: ['coffee', 'browserify']
    },
    hbs: {
        files: [
            'frontend/js/**/*.hbs'
        ],
        tasks: ['bootlint', 'copy:hbs']
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