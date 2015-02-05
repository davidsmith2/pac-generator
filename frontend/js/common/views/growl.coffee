Marionette = require 'marionette'
$ = require 'jquery'
_ = require 'underscore'
require 'bootstrap-growl'

class GrowlView extends Marionette.ItemView
    template: false
    defaults:
        options: {}
        settings:
            offset: 0
            placement:
                align: 'center'
            template: require('./templates/growl.hbs')()
    initialize: (opts) =>
        @.options = _.extend @.defaults.options, opts.options
        @.settings = _.extend @.defaults.settings, opts.settings
        @.render()
    onBeforeRender: () =>
        $.growl @.options, @.settings

module.exports = GrowlView