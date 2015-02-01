var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var RulesCollection = require('../../entities/rules');
var RuleModel = require('../../entities/rule');

module.exports = function (App) {
    var HostController = require('../../controllers/host')(App);
    return new HostController({
        collection: new RulesCollection(),
        Model: RuleModel,
        region: App.rulesRegion,
        compositeViewTitle: 'Rules',
        modalTitles: {
            create: 'Create rule',
            edit: 'Edit rule'
        }
    });
};
