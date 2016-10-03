var mongoose = require('mongoose');

var TenantSchema = new mongoose.Schema({
   name: {
      type: String,
      unique: true
   },
   createdOn: {
      type: Date,
      'default': Date.now
   },
   modifiedOn: {
      type: Date,
      'default': Date.now
   }
});

module.exports = mongoose.model('Tenant', TenantSchema);
