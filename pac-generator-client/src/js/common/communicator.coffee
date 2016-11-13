Backbone = require 'backbone'

commands = new Backbone.Wreqr.Commands
reqres = new Backbone.Wreqr.RequestResponse
vent = new Backbone.Wreqr.EventAggregator

module.exports =
    commands: commands
    reqres: reqres
    vent: vent
