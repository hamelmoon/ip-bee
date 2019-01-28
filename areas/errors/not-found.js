var join = require('path').join

function notFound(req, res) {
    res.status(404);
    res.sendFile(join(__dirname + '/../static/noimage_600.png'));
}

module.exports = notFound