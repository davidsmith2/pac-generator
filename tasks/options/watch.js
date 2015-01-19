module.exports = {
    backend: {
        files: [
            'backend/server.js',
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