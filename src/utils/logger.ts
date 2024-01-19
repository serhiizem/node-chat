import * as rootPath from "app-root-path";
import {createLogger, transports} from "winston";

const options = {
    file: {
        level: 'info',
        filename: `${rootPath}/logs/app.log`,
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

export const logger = new createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false
});
