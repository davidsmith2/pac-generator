module.exports = {
    dev: {
        expand: true,
        cwd: 'frontend/js',
        dest: '<%= coffee.dev.cwd %>',
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