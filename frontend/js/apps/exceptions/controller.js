var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var Exceptions = require('../../entities/exceptions');
var Exception = require('../../entities/exception');

module.exports = function (App) {
    var HostController = require('../../controllers/host')(App);
    return new HostController({
        collection: new Exceptions(),
        Model: Exception,
        region: App.exceptionsRegion,
        compositeViewTitle: 'Exceptions',
        modalTitles: {
            create: 'Create exception',
            edit: 'Edit exception'
        }
    });
};
