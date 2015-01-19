module.exports = function (server, bodyParser) {
    var urlencodedParser = bodyParser.urlencoded({extended: false});
    server.get('/', function (req, res) {
        res.render('index', {
            title: 'PAC Generator'
        });
    });
};
