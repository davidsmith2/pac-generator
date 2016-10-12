var mongoose = require('mongoose');

//var hostSchema = require('../schemas/hostSchema');

var RuleSchema = new mongoose.Schema({
    host: String,
    proxy: String,
    active: Boolean,
    _creator: {type: String, ref: 'User'}
});

module.exports = mongoose.model('Rule', RuleSchema);
