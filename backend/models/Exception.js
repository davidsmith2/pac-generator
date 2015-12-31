var mongoose = require('mongoose');
var hostSchema = require('../schemas/hostSchema');

Schema = mongoose.Schema;

var ExceptionSchema = new Schema(hostSchema);

module.exports = mongoose.model('Exception', ExceptionSchema);
