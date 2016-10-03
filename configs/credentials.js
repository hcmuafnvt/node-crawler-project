var mongodb = {
   development : {
      admin : {
         connectionString : 'mongodb://localhost:27017/node-crawler-project',
         username : '',
         password : ''
      }
   },
   production : {
      admin : {
         connectionString : 'mongodb://localhost:27017/node-crawler-project',
         user : '',
         pass : ''
      }
   }
}

exports.mongodb = mongodb;
