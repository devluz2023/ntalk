// libs/db_connection.js
const mongoose = require('mongoose');

const env_url = {
  "test": "mongodb://localhost/ntalk_test",
  "development": "mongodb://localhost/ntalk"
};

let connection;

module.exports = function() {
  if (!connection) {
    const url =  env_url['development'];
    connection = mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  return connection;
};
