Marionette = require 'marionette'
$ = require 'jquery'

class PublishBehavior extends Marionette.Behavior
    defaults:
        buttonSelector: ':button'
    initialize: () =>
        @.listenTo @.view, 'publish:enable', @.onEnable
        @.listenTo @.view, 'publish:disable', @.onDisable
    onEnable: () =>
        $el = @.getElement()
        $el.removeClass 'btn-default'
        $el.addClass 'btn-warning'
        $el.attr
            disabled: false
        @.view.trigger 'publish:enabled'
    onDisable: () =>
        $el = @.getElement()
        $el.removeClass 'btn-warning'
        $el.addClass 'btn-default'
        $el.attr
            disabled: true
        @.view.trigger 'publish:disabled'
    getElement: () =>
        return @.$(@.options.buttonSelector)

module.exports = PublishBehavior