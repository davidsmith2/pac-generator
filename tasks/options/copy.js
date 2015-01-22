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
    js: {
        files: [
            {
                expand: true,
                cwd: 'frontend/js/',
                src: ['**/*'],
                dest: 'build/js'
            }
        ]
    },
    pac: {
        files: [
            {
                expand: true,
                cwd: 'build/pac/',
                src: ['**/*'],
                dest: 'release/pac'
            }
        ]
    }
};