module.exports = {
    dev: {
        expand: true,
        cwd: 'frontend/js',
        dest: '.tmp/js',
        ext: '.js',
        src: [
            '*.coffee',
            '**/*.coffee'
        ],
        options: {
            bare: true,
            sourceMap: true
        }
    }
};