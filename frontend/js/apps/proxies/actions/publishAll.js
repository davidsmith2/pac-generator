var GrowlView = require('../../../common/views/growl');

module.exports = function (App, controller, options) {
    var growlOptions = {}, growlSettings = {};
    options.collection.publish({
        success: function () {
            growlOptions.icon = 'glyphicon glyphicon-ok';
            growlOptions.message = 'PAC files published for all proxies';
            growlSettings.type = 'success';
            return new GrowlView({
                options: growlOptions,
                settings: growlSettings
            });
        },
        error: function () {
            console.log('error publishing PAC files');
        }
    });
};
