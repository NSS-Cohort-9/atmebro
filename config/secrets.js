'use strict';

var databaseName = 'minitwitdb';

module.exports = {
  db: process.env.MONGODB_URL || `mongodb://localhost:27017/${databaseName}`
};
