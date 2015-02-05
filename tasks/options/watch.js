module.exports = {
    copy: {
        files: [
            'frontend/css/**/*.css'
        ],
        tasks: ['copy:css']
    },
    coffee: {
        files: [
            'frontend/js/**/*.coffee',
            'frontend/js/**/*.hbs'
        ],
        tasks: ['copy:hbs', 'coffee', 'browserify']
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
    }
};