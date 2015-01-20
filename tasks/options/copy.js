module.exports = {
    css: {
        files: [
            {
                expand: true,
                cwd: 'frontend/css/',
                src: ['**/*'],
                dest: 'public/css'
            }
        ]
    },
    fonts: {
        files: [
            {
                expand: true,
                cwd: 'frontend/fonts/',
                src: ['**/*'],
                dest: 'public/fonts'
            }
        ]
    },
    js: {
        files: [
            {
                expand: true,
                cwd: 'frontend/js/',
                src: ['**/*'],
                dest: 'public/js'
            }
        ]
    }
};