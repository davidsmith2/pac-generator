var mongoose = require('mongoose');

var RuleSchema = new mongoose.Schema({
    host: String,
    active: Boolean
});

module.exports = RuleSchema;
