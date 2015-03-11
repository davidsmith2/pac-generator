module.exports = {
    build: {
        options: {
            browserifyOptions: {
                debug: true,
                extensions: ['.coffee']
            },
            transform: ['coffeeify']
        },
        src: ['./frontend/js/index.coffee'],
        dest: './build/js/index.js'
    }
};