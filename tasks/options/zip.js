module.exports = {
    dev: {
        src: [
            '.ebextensions/**/*',
            'app.js',
            'backend/**/*',
            'build/**/*',
            'package.json'
        ],
        dest: 'deploy/<%= pkg.name %>.zip'
    }
};