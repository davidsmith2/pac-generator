var grunt = require('grunt');

var SHA1 = grunt.option('SHA1');

module.exports = {
	deploy: {
	    src: [
	        '.ebextensions/**/*',
	        'Dockerrun.aws.json'
	    ],
	    dest: 'dist/<%= pkg.name %>-' + SHA1 + '.zip'

	}
};
