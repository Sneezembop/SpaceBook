var mongoose = require("mongoose");
var connectionString = 'mongodb://localhost:/spacebook'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds129946.mlab.com:29946/heroku_h8q8n2wg';
}



var db = mongoose.connect(connectionString, {useMongoClient: true});

module.exports = db;
