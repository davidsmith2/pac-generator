var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var mkdirp = require('mkdirp');
var mongoose = require('mongoose');
var rmdir = require('rmdir');
var _ = require('underscore');

var ExceptionSchema = require('./ExceptionSchema');
var ProxySchema = require('./ProxySchema');
var RuleSchema = require('./RuleSchema');
var PACTemplate = require('../templates/pac');

var UserSchema = mongoose.Schema({
    _id: String,
    uuid: String,
    local: {
        email: String,
        password: String
    },
    proxies: [ProxySchema],
    rules: [RuleSchema],
    exceptions: [ExceptionSchema]
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.writePAC = function (proxy) {
    var dirp = './dist/pac/' + this.uuid + '/' + proxy.id;
    mkdirp(dirp, _.bind(function (err) {
        var data;
        if (err) {
            return console.log(err);
        }
        data = PACTemplate(
            proxy,
            this.getPACHosts(this.exceptions),
            this.getPACHosts(this.rules)
        );
        fs.writeFile(dirp + '/proxy.pac', data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('PAC file created for ' + proxy.name + ' proxy');
        });
    }, this));
};

UserSchema.methods.getPACHosts = function (arrIn) {
    var arrOut = [];
    for (var i = 0; i < arrIn.length; i++) {
        if (arrIn[i].active) {
            arrOut.push(arrIn[i].host);
        }
    }
    return (arrOut.length) ? "'" + arrOut.join("','") + "'" : arrOut;
};

UserSchema.methods.deletePAC = function (proxy) {
    var dirp = './dist/pac/' + this.uuid + '/' + proxy.id;
    rmdir(dirp, function (err, dirs, files) {
        console.log('directories deleted: ' + dirs);
        console.log('files deleted: ' + files);
    });
};

module.exports = mongoose.model('User', UserSchema);
