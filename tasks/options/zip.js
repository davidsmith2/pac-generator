var grunt = require('grunt');

var SHA1 = grunt.option('SHA1');

module.exports = {
	predeploy: {
	    src: [
	        '.ebextensions/**/*',
	        'assets/**/*',
	        'Dockerrun.aws.json'
	    ],
	    dest: 'predeploy/<%= pkg.name %>-' + SHA1 + '.zip'
	}
};
