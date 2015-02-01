module.exports = function (App, controller, options) {
    options.model.copy({
        success: function (response) {
            console.log(response);
        },
        error: function () {
            console.log('error copying PAC file URL');
        }
    });
};