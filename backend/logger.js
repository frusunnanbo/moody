const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.simple()
        }),
    ],
});

module.exports = logger