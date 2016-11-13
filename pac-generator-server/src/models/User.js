var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    _id: String,
    local: {
        email: String,
        password: String
    },
    proxies: [{type: Schema.Types.ObjectId, ref: 'Proxy'}],
    rules: [{type: Schema.Types.ObjectId, ref: 'Rule'}],
    exceptions: [{type: Schema.Types.ObjectId, ref: 'Exception'}]
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);