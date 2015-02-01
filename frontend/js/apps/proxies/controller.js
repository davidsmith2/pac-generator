var Marionette = require('marionette');

var Proxies = require('../../entities/proxies');

module.exports = function (App) {
    var Controller = Marionette.Controller.extend({
        initialize: function () {
            this.collection = new Proxies();
        },
        copy: function (options) {
            return require('./actions/copy')(App, this, options);
        },
        create: function () {
            return require('./actions/create')(App, this);
        },
        delete: function (options) {
            return require('./actions/delete')(App, this, options);
        },
        edit: function (options) {
            return require('./actions/edit')(App, this, options);
        },
        index: function () {
            return require('./actions/index')(App, this);
        },
        publish: function (options) {
            return require('./actions/publish')(App, this, options);
        },
        publishAll: function (options) {
            return require('./actions/publishAll')(App, this, options);
        }
    });
    return new Controller();
};
