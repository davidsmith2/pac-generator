module.exports = {
    public: {
        files: [
            {
                expand: true,
                cwd: 'src/public/fonts/',
                src: ['**/*'],
                dest: 'dist/public/fonts'
            },
            {
                expand: true,
                cwd: 'src/public/',
                src: ['.htaccess'],
                dest: 'dist/public'
            }
        ]
    }
};
