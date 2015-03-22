var mongoose = require('mongoose');
var uriUril = require('mongodb-uri');

var mongodbOptions = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};

var mongodbUri = 'mongodb://admin:admin@ds031691.mongolab.com:31691/pac-generator';
var mongooseUri = uriUril.formatMongoose(mongodbUri);

mongoose.connect(mongodbUri, mongodbOptions);

var mongooseConn = mongoose.connection;
mongooseConn.on('error', console.error.bind(console, 'Mongoose connection error:'));
mongooseConn.once('open', function () {
    console.log('Mongoose connection open');
});

module.exports = mongooseConn;
