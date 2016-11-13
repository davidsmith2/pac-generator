module.exports = {
    public: {
        files: [
            {
                expand: true,
                cwd: 'src/fonts/',
                src: ['**/*'],
                dest: 'dist/fonts'
            },
            {
                expand: true,
                cwd: 'src/',
                src: ['.htaccess'],
                dest: 'dist'
            }
        ]
    }
};
