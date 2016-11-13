Marionette = require 'marionette'
$ = require 'jquery'

class SaveBehavior extends Marionette.Behavior
    defaults:
        fieldSelector: ':input'
    initialize: () =>
        @.listenTo @.view, 'save', @.onSave
    onSave: () =>
        @.$(@.options.fieldSelector).each (index, el) =>
            $el = $(el)
            @.view.model.set $el.attr('name'), $el.val()
        @.view.trigger 'saved', @.view.model

module.exports = SaveBehavior