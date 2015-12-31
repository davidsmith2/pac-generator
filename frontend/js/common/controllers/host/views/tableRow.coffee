Marionette = require 'marionette'
require 'bootstrap-switch'

class TableRowView extends Marionette.ItemView
    template: require './templates/tableRow.hbs'
    tagName: 'tr'
    ui:
        deleteBtn:  '.js-delete'
        editBtn:    '.js-edit'
        toggleBtn:  '.js-toggle'
    triggers:
        'click @ui.deleteBtn': 'delete'
        'click @ui.editBtn':   'edit'
    modelEvents:
        'change:host': 'hostChanged'
    onRender: () =>
        @.ui.toggleBtn.bootstrapSwitch
            onSwitchChange: (event, state) =>
                @.model.set 'active', state
                @.trigger 'toggle', @
    hostChanged: () =>
        @.render()

module.exports = TableRowView