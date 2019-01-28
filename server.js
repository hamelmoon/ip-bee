var app = require('./global')
var config = require('./config')
var logging = require('./middleware/logging')
const chalk = require('chalk');
//bole 로깅 시작
logging.init();



console.log(chalk.green('IIIIIIIIIIPPPPPPPPPPPPPPPPP           BBBBBBBBBBBBBBBBB                                           '));
console.log(chalk.green('I::::::::IP::::::::::::::::P          B::::::::::::::::B'));
console.log(chalk.green('I::::::::IP::::::PPPPPP:::::P         B::::::BBBBBB:::::B'));
console.log(chalk.green('II::::::IIPP:::::P     P:::::P        BB:::::B     B:::::B'));
console.log(chalk.green('I::::I    P::::P     P:::::P          B::::B     B:::::B    eeeeeeeeeeee        eeeeeeeeeeee    '));
console.log(chalk.green('I::::I    P::::P     P:::::P          B::::B     B:::::B  ee::::::::::::ee    ee::::::::::::ee'));
console.log(chalk.green('I::::I    P::::PPPPPP:::::P           B::::BBBBBB:::::B  e::::::eeeee:::::ee e::::::eeeee:::::ee'));
console.log(chalk.green('I::::I    P:::::::::::::PP            B:::::::::::::BB  e::::::e     e:::::ee::::::e     e:::::e'));
console.log(chalk.green('I::::I    P::::PPPPPPPPP              B::::BBBBBB:::::B e:::::::eeeee::::::ee:::::::eeeee::::::e'));
console.log(chalk.green('I::::I    P::::P                      B::::B     B:::::Be:::::::::::::::::e e:::::::::::::::::e'));
console.log(chalk.green('I::::I    P::::P                      B::::B     B:::::Be::::::eeeeeeeeeee  e::::::eeeeeeeeeee'));
console.log(chalk.green('I::::I    P::::P                      B::::B     B:::::Be:::::::e           e:::::::e'));
console.log(chalk.green('II::::::IIPP::::::PP                  BB:::::BBBBBB::::::Be::::::::e          e::::::::e'));
console.log(chalk.green('I::::::::IP::::::::P           ...... B:::::::::::::::::B  e::::::::eeeeeeee   e::::::::eeeeeeee'));
console.log(chalk.green('I::::::::IP::::::::P.::::. B::::::::::::::::B    ee:::::::::::::e    ee:::::::::::::e'));
console.log(chalk.green('IIIIIIIIIIPPPPPPPPPP           ...... BBBBBBBBBBBBBBBBB       eeeeeeeeeeeeee      eeeeeeeeeeeeee'));
console.log(chalk.magenta('Image Processing Bee'));

console.log(chalk.bgCyan('[LOG]'));
logging.info('server process starting');

process.on('uncaughtException', function (err) {
    logging.error(err);
});

app.listen(config.express.port, config.express.ip, function (error) {
    if (error) {
        logging.error('Unable to listen for connections', error)
        process.exit(10)
    }
    logging.info('express is listening on http://' +
        config.express.ip + ':' + config.express.port)
})

