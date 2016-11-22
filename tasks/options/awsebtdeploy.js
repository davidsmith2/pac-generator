var grunt = require('grunt');
var path = require('path');

var ACCESS_KEY_ID = grunt.option('AWS_ACCESS_KEY_ID');
var APPLICATION_NAME = 'pac-generator';
var DEPLOY_TIMEOUT_MIN = 45;
var ENVIRONMENT_CNAME = 'pac-generator-dev.elasticbeanstalk.com';
var REGION = 'us-east-1';
var S3_BUCKET = 'elasticbeanstalk-us-east-1-798511191442';
var SECRET_ACCESS_KEY = grunt.option('AWS_SECRET_ACCESS_KEY');
var SHA1 = grunt.option('SHA1');

module.exports = {
    options: {
        accessKeyId: ACCESS_KEY_ID,
        applicationName: APPLICATION_NAME,
        deployTimeoutMin: DEPLOY_TIMEOUT_MIN,
        environmentCNAME: ENVIRONMENT_CNAME,
        region: REGION,
        s3: {
			bucket: S3_BUCKET,
			key: path.basename('deploy/<%= pkg.name %>-' + SHA1 + '.zip')
		},
        secretAccessKey: SECRET_ACCESS_KEY,
        sourceBundle: 'deploy/<%= pkg.name %>-' + SHA1 + '.zip'
	}
};
