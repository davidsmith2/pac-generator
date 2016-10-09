var grunt = require('grunt');

var SHA1 = grunt.option('SHA1');

module.exports = {
    deploy: {
        src: [
            '.ebextensions/**/*',
            'Dockerfile'
        ],
        dest: 'deploy/<%= pkg.name %>-' + SHA1 + '.zip'
    }
};
