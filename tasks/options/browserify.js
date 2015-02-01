module.exports = {
    options: {
        debug: true,
        watch: true,
        browserifyOptions: {
            debug: true
        }
    },
    dev: {
        src: ['frontend/js/index.js'],
        dest: 'build/js/index.js'
    }
};