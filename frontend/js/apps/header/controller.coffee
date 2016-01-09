Backbone = require 'backbone'
Marionette = require 'marionette'

LayoutView = require './views/layout'

module.exports = (App) =>
    class HeaderController extends Marionette.Controller
        initialize: () =>
            @.headerRegion = App.headerRegion
            @.layoutView = new LayoutView
                model: new Backbone.Model
                    title: @.headerRegion.$el.data('title')
                    username: @.headerRegion.$el.data('username')
        show: () =>
            @.headerRegion.show @.layoutView
        notify: (opts) =>
            return require('../../common/actions/notify')(opts)

    return new HeaderController
