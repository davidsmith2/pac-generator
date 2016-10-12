Marionette = require 'marionette'
$ = require 'jquery'
require 'bootstrap-growl'

Communicator = require '../communicator'

class GrowlView extends Marionette.ItemView
    template: false
    defaults:
        options:
            message: ''
            icon: 'glyphicon glyphicon-info-sign'
        settings:
            offset: 0
            placement:
                align: 'center'
            template: require('./templates/growl.hbs')()
            type: 'info'
    initialize: (opts) =>
        @.options = $.extend {}, @.defaults.options, opts.options
        @.settings = $.extend {}, @.defaults.settings, opts.settings
        @.render()
    onBeforeRender: () =>
        $.growl @.options, @.settings


API = 
    growl: (opts) =>
        return new GrowlView opts

Communicator.commands.setHandler 'growl:show', (opts) =>
    return API.growl opts

module.exports = GrowlView