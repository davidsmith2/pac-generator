Communicator = require '../communicator'
GrowlView = require '../views/growl'

module.exports = (opts) =>
    Communicator.commands.execute 'growl:show', opts