module.exports = function (server, bodyParser) {
    server.get('/', function (req, res) {
        res.render('index', {
            title: 'PAC Files'
        });
    });
};
