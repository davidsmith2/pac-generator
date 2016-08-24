module.exports = {
    deploy: {
        src: [
            '.ebextensions/**/*',
            'backend/**/*',
            'build/**/*',
            'app.js',
            'package.json'
        ],
        dest: 'deploy/<%= pkg.name %>.zip'
    }
};