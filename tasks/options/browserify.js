module.exports = {
    build: {
        options: {
            browserifyOptions: {
                debug: true,
                extensions: ['.coffee']
            },
            transform: ['coffeeify']
        },
        files: {
            './build/js/index.js': ['./frontend/js/index.coffee']
        }
    }
};