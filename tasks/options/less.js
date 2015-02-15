module.exports = {
    build: {
        options: {
            sourceMap: true,
            sourceMapFilename: 'build/css/index.css.map',
            sourceMapURL: '/css/index.css.map',
            outputSourceFiles: true
        },
        files: {
            'build/css/index.css': ['frontend/css/index.less']
        }
    }
};