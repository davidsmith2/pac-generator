CompositeView = require '../views/composite'

module.exports = (App, controller) =>
    controller.collection.fetch
        success: (proxies) =>
            compositeView = new CompositeView
                collection: proxies
            compositeView.on 'create', controller.create, controller
            compositeView.on 'publish', controller.publishAll, controller
            compositeView.on 'childview:copy', controller.copy, controller
            compositeView.on 'childview:delete', controller['delete'], controller
            compositeView.on 'childview:edit', controller.edit, controller
            compositeView.on 'childview:publish', controller.publish, controller
            App.NavApp.trigger 'tab:change', 'proxiesRegion', compositeView
