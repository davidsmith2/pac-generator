module.exports = {
    coffee_to_js: {
        options: {
            bare: true,
            sourceMap: true
        },
        expand: true,
        flatten: false,
        cwd: 'frontend/js',
        src: ['**/*.coffee'],
        dest: '.tmp/js',
        ext: '.js'
    }
};