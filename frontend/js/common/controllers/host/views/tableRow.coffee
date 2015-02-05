Marionette = require 'marionette'

class TableRowView extends Marionette.ItemView
    template: require './templates/tableRow.hbs'
    tagName: 'tr'
    triggers:
        'click .js-edit': 'edit'
        'click .js-delete': 'delete'
    modelEvents:
        'change:host': 'hostChanged'
    hostChanged: () =>
        @.render()

module.exports = TableRowView