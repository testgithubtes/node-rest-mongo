var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoapp', {
  useMongoClient: true,
  /* other options */
});
module.exports = {mongoose};
