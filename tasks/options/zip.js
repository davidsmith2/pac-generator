var moment = require('moment');
var nowMoment = moment().format('YYYYMMDDHHmmss');
module.exports = {
    dev: {
        src: [
            '.ebextensions/**/*',
            'app.js',
            'backend/**/*',
            'build/**/*',
            'package.json'
        ],
        dest: 'deploy/<%= pkg.name %>-' + nowMoment + '.zip'
    }
};