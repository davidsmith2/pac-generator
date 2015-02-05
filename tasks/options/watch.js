module.exports = {
    copy: {
        files: [
            'frontend/css/**/*.css'
        ],
        tasks: ['copy:css']
    },
    coffeeify: {
        files: [
            'frontend/js/**/*.coffee'
        ],
        tasks: ['coffeeify']
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