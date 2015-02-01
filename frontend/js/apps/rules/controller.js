var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var Rules = require('../../entities/rules');
var Rule = require('../../entities/rule');

module.exports = function (App) {
    var HostController = require('../../common/controllers/host/controller')(App);
    return new HostController({
        collectionType: Rules,
        relatedModel: Rule,
        regionName: 'rulesRegion',
        content: {
            regionTitle: 'Rules',
            modalTitles: {
                create: 'Create rule',
                edit: 'Edit rule'
            }
        }
    });
};
