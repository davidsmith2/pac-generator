var GrowlView = require('../../../common/views/growl');

module.exports = function (App, controller, options) {
    var growlOptions = {}, growlSettings = {};
    growlSettings.placement = {};
    growlSettings.placement.align = 'center';
    options.model.publish({
        success: function () {
            growlOptions.icon = 'glyphicon glyphicon-ok';
            growlOptions.message = 'PAC file published for ' + options.model.get('name') + ' proxy';
            growlSettings.type = 'success';
            return new GrowlView({
                options: growlOptions,
                settings: growlSettings
            });
        },
        error: function () {
            console.log('error publishing PAC file');
        }
    });
};
