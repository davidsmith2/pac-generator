module.exports = {
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