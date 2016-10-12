module.exports = {
    build: {
        options: {
            sourceMap: true,
            sourceMapFilename: 'dist/public/css/index.css.map',
            sourceMapURL: '/css/index.css.map',
            outputSourceFiles: true
        },
        files: {
            'dist/public/css/index.css': ['src/public/css/index.less']
        }
    }
};
