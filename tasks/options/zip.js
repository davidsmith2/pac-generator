module.exports = {
    deploy: {
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