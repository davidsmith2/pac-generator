Marionette = require 'marionette'

class PublishView extends Marionette.ItemView
    template: require './templates/publish.hbs'
    tagName: 'button'
    className: 'btn btn-default pull-right mt1'
    events:
        'click': 'onClick'
    onClick: (e) =>
        e.preventDefault()
        @.disable()
    onBeforeRender: () =>
        @.$el.attr
            disabled: true
    enable: () =>
        $el = @.$el
        $el.removeClass 'btn-default'
        $el.addClass 'btn-warning'
        $el.attr
            disabled: false
    disable: (e) =>
        $el = @.$el
        $el.removeClass 'btn-warning'
        $el.addClass 'btn-default'
        $el.attr
            disabled: true
        @.trigger 'disabled'

module.exports = new PublishView
