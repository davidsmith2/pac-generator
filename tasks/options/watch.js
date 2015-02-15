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
            'frontend/js/**/*.coffee',
            'frontend/js/**/*.hbs'
        ],
        tasks: ['bootlint', 'coffee', 'browserify']
    },
    copy: {
        files: [
            'frontend/css/**/*.css',
            'frontend/js/**/*.hbs'
        ],
        tasks: ['copy:css', 'copy:hbs']
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