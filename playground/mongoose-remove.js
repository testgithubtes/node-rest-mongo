const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todos } = require('./../server/models/todos');
const { User } = require('./../server/models/users');

// Todos.remove({}).then((result) => {
//   console.log(result);
// });

// Todos.findOneAndRemove
// Todos.findByIdAndRemove

Todos.findByIdAndRemove('59727d49d2beac2843ac9fcd').then((todos) => {
  console.log(todos);
});

// Todos.findByIdAndRemove('azd').then((todos) => {
//   console.log(todos);
// });
