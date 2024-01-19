const appRoot = require('app-root-path');
const { createLogger, transports } = require('winston');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true
    },
};

const logger = new createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false
});

module.exports = logger;