var logging = module.exports;
var bole = require('bole');
var log = bole('server');
var config = require('./../config');

logging.init = function () {

    log.info('Start bole Logging System');
    bole.output([
        { level: 'debug', stream: process.stdout }
    ]);

}

logging.info = function (result) {
    return log.info(result);
}

logging.error = function (result) {
    return log.error(result);
}

logging.debug = function (result) {
    return log.debug(result);
}