module.exports = {
    frontend: {
        files: [
            'frontend/**/*.css',
            'frontend/**/*.js'
        ],
        tasks: ['build'],
        options: {
            livereload: false
        }
    },
    backend: {
        files: [
            'backend/**/*.js',
            'backend/views/**/*.jade',
            'data/**/*.js'
        ],
        tasks: ['express:web'],
        options: {
            atBegin: true,
            spawn: false
        }
    }
};