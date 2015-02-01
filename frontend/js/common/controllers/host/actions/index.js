var $ = require('jquery');

var CompositeView = require('../views/composite');

module.exports = function (App, controller) {
    controller.collection.fetch({
        success: function (collection) {
            var compositeView = new CompositeView({collection: collection});
            compositeView.on('render', function () {
                this.$('h2').html(controller.content.regionTitle);
            });
            compositeView.on('create', controller.create, controller);
            compositeView.on('childview:edit', controller.edit, controller);
            compositeView.on('childview:delete', controller['delete'], controller);
            App.NavApp.trigger('tab:change', controller.regionName, compositeView);
        }
    });
};
