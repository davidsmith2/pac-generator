var moment = require('moment');

var nowMoment = moment().format('YYYYMMDDHHmmss');

module.exports = {
    'dev': {
        options: {
            region: 'us-east-1',
            applicationName: '<%= pkg.name %>',
            environmentCNAME: '<%= pkg.name %>-dev.elasticbeanstalk.com',
            sourceBundle: '<%= zip.dev.dest %>',
            accessKeyId: '<%= aws.accessKeyId %>',
            secretAccessKey: '<%= aws.secretAccessKey %>',
            versionLabel: '<%= pkg.name %>-' + nowMoment,
            s3: {
                bucket: '<%= pkg.name %>',
                key: '<%= pkg.name %>-' + nowMoment + '.zip'
            }
        }
    }
};