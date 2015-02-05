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
    hbs: {
        files: [
            {
                expand: true,
                cwd: 'frontend/js/',
                src: ['**/*.hbs'],
                dest: '.tmp/js'
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