module.exports = {
    build: {
        options: {
            browserifyOptions: {
                debug: true
            }
        },
        files: {
            './build/js/index.js': ['./.tmp/js/index.js']
        }
    }
};