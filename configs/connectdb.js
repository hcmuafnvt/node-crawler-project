var mongoose = require('mongoose');

//load modules
var credentials = require('./credentials'),
    logger = require('../utils/winstonLogger');

var mongodb = {
   connect : function() {
      var mongodbConfig = credentials.mongodb;
      var opts = {
         'user' : mongodbConfig.development.admin.user,
         'pass' : mongodbConfig.development.admin.pass
      };
      mongoose.connect(mongodbConfig.development.admin.connectionString, opts);
   },
   close : function() {
      mongoose.connection.close(function () {
          logger.log('console', 'Mongoose disconnected through app termination', 'info');
          process.exit(0);
      });
   },
   onError : function() {
      mongoose.connection.on('error', function(err) {
         logger.log('console', 'Mongoose connection error: ' + err, 'error');
      });
   },
   onDisconnected : function() {
      mongoose.connection.on('disconnected', function() {
         logger.log('console', 'Mongoose disconnected', 'info');
      });
   },
   init : function() {
      mongodb.connect();
      mongodb.onError();
      mongodb.onDisconnected();
      process.on('SIGINT', function() {
         mongodb.close();
      });
   }
};

exports.mongodb = mongodb;
