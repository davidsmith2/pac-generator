module.exports = {
    css: {
        files: [
            'frontend/**/*.css'
        ],
        tasks: ['copy:css']
    },
    js: {
        files: [
            'frontend/**/*.coffee'
        ],
        tasks: ['coffee', 'browserify']
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