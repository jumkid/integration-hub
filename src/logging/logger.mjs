import Conf from '../config/server-conf.mjs';
import winston from 'winston';

const Logger = new winston.createLogger({

    transports: [

        new winston.transports.File({
            level: Conf.logLevel,
            filename: Conf.logPath,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 10,
            colorize: false
        }),

        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })

    ],

    exitOnError: false

});

export default Logger;
