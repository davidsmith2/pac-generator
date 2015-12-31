var mongoose = require('mongoose');
var hostSchema = require('../schemas/hostSchema');

var Schema = mongoose.Schema;

var RuleSchema = new Schema(hostSchema);

module.exports = mongoose.model('Rule', RuleSchema);
