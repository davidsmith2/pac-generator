module.exports = {
    frontend: {
        files: [
            'frontend/**/*.css'
        ],
        tasks: ['copy:css']
    },
    livereload: {
        files: [
            'build/**/*'
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