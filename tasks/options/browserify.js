module.exports = {
    build: {
        options: {
            browserifyOptions: {
                debug: true
            }
        },
        files: {
            './build/js/index.js': ['./frontend/js/index.js']
        }
    }
};