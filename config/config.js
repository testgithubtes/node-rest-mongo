var env = process.env.NODE_ENV || 'development';
console.log('env ********', env);
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoapp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoapptest';
} else if (env == 'production') {
  process.env.MONGODB_URI = 'mongodb://sr:rs@ds115573.mlab.com:15573/todoapp';
}
