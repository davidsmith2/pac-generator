Marionette = require 'marionette'

ResourceLayoutView = require '../../views/resourceLayout'

module.exports = (App) =>
    class Controller extends Marionette.Controller
        initialize: (options) =>
            @.collection = new options.collectionType
            @.relatedModel = options.relatedModel
            @.regionName = options.regionName
            @.content = options.content
            @.layout = new ResourceLayoutView
        'delete': (options) =>
            return require('./actions/delete')(App, this, options)
        edit: (options) =>
            return require('./actions/edit')(App, this, options)
        index: () =>
            return require('./actions/index')(App, this)
        toggle: (options) =>
            return require('./actions/toggle')(App, this, options)
    return Controller
