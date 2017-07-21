var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sr:rs@ds115573.mlab.com:15573/todoapp' ||
'mongodb://localhost:27017/todoapp', {
  useMongoClient: true,
  /* other options */
});

module.exports = { mongoose };
