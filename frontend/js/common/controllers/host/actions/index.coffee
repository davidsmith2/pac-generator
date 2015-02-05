$ = require 'jquery'
CompositeView = require '../views/composite'

module.exports = (App, controller) =>
    controller.collection.fetch
        success: (collection) =>
            compositeView = new CompositeView collection: collection
            compositeView.on 'render', () =>
                compositeView.$('h2').html controller.content.regionTitle
            compositeView.on 'create', controller.create, controller
            compositeView.on 'childview:edit', controller.edit, controller
            compositeView.on 'childview:delete', controller['delete'], controller
            App.NavApp.trigger 'tab:change', controller.regionName, compositeView
