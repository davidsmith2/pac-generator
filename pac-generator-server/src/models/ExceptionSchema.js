var mongoose = require('mongoose');

var ExceptionSchema = new mongoose.Schema({
    host: String,
    active: Boolean
});

module.exports = ExceptionSchema;
