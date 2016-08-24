module.exports = {
    deploy: {
        src: [
            '.ebextensions/**/*',
            'backend/**/*',
            'build/**/*',
            'app.js',
            'Dockerfile',
            'package.json'
        ],
        dest: 'deploy/<%= pkg.name %>.zip'
    }
};