var Marionette = require('marionette');

module.exports = function (App) {
    var Controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.collection = new options.collectionType();
            this.relatedModel = options.relatedModel;
            this.regionName = options.regionName;
            this.content = options.content;
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
        }
    });
    return Controller;
};
