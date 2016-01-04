var mongoose = require('mongoose');

//var hostSchema = require('../schemas/hostSchema');

var ExceptionSchema = new mongoose.Schema({
    host: String,
    proxy: String,
    active: Boolean,
    _creator: {type: String, ref: 'User'}
});

module.exports = mongoose.model('Exception', ExceptionSchema);
