var Backbone = require('backbone');

var AlertView = require('../../../common/views/alert');
var MessageView = require('../views/message');

module.exports = function (App, controller, options) {
    var alertView = new AlertView();
    options.model.publish({
        success: function (response) {
            alertView.on('before:render', function () {
                this.$el.addClass('alert-success');
            });
            alertView.on('render', function () {
                this.contentRegion.show(new MessageView({model: new Backbone.Model(response)}));
            });
            App.alertRegion.show(alertView);
        },
        error: function () {
            console.log('error publishing PAC file');
        }
    });
};
