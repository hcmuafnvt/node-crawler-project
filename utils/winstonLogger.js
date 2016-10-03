'use strict';

var winston = require('winston'), //https://github.com/winstonjs/winston
    path = require('path'),
    DailyRotateFile = require('winston-daily-rotate-file'); //Link to refer : https://www.npmjs.com/package/winston-daily-rotate-file

/**
 * this private function is used to create a instance on winston transport
 * @param  {string} filename      [required]
 * @param  {object} customOptions [optional]
 * @return {[object]}             [winston transport instance]
 */
function createTransportFileInstance(filename, customOptions) {
   var logsFolderPath = path.resolve(process.cwd()) + '/logs/';
   var customOptions = customOptions || {};
   var defaultOptions = {
      filename: logsFolderPath + filename || 'default.log', // this path needs to be absolute
      level: customOptions.level || 'info', //default level
      colorize: customOptions.colorize || false,
      timestamp: customOptions.timestamp || true,
      json: customOptions.json || true,
      maxsize: customOptions.maxsize || '1000000', //1MB
      maxFiles: customOptions.maxFiles || 10,
      compress: customOptions.compress || true,
      zippedArchive: customOptions.zippedArchive || true,
      datePattern: customOptions.datePattern || '.yyyy-MM-dd' //default of winston-daily-rotate-file
   };

   var opts = Object.assign({}, defaultOptions, customOptions || {});

   return new DailyRotateFile(opts);
}

function rewriterCardNumber(level, msg, meta) {
   if (meta.creditCard) {
      meta.creditCard = '**CardNumber**'; //TODO : return string format as "123456****2345"
   }

   return meta;
}

/**
 * This private function is used to create winston instance with configures
 * @return {[object]} [return a winston instance]
 */
function createWinstonProxy() {
   var Logger = winston.Logger;
   var options = {
      exitOnError: false,
      transports: [
         createTransportFileInstance('log', {level: 'debug'})
      ],
      exceptionHandlers: [
         createTransportFileInstance('exception.log')
      ],
      rewriters: [
         rewriterCardNumber
      ]
   }

   return new Logger(options);
};

module.exports = createWinstonProxy();
