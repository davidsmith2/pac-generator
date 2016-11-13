module.exports = {
    build: {
        options: {
            sourceMap: true,
            sourceMapFilename: 'dist/css/index.css.map',
            sourceMapURL: '/static/css/index.css.map',
            outputSourceFiles: true
        },
        files: {
            'dist/css/index.css': ['src/css/index.less']
        }
    }
};
