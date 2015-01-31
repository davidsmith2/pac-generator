module.exports = {
    css: {
        files: [
            {
                expand: true,
                cwd: 'frontend/css/',
                src: ['**/*'],
                dest: 'build/css'
            }
        ]
    },
    fonts: {
        files: [
            {
                expand: true,
                cwd: 'frontend/fonts/',
                src: ['**/*'],
                dest: 'build/fonts'
            }
        ]
    },
    pac: {
        files: [
            {
                expand: true,
                cwd: 'frontend/',
                src: ['.htaccess'],
                dest: 'build'
            }
        ]
    }
};