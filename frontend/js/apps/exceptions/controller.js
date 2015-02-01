var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var Exceptions = require('../../entities/exceptions');
var Exception = require('../../entities/exception');

module.exports = function (App) {
    var HostController = require('../../common/controllers/host/controller')(App);
    return new HostController({
        collectionType: Exceptions,
        relatedModel: Exception,
        regionName: 'exceptionsRegion',
        content: {
            regionTitle: 'Exceptions',
            modalTitles: {
                create: 'Create exception',
                edit: 'Edit exception'
            }
        }
    });
};
