const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todos } = require('./../server/models/todos');
const { User } = require('./../server/models/users');

Todos.remove({}).then((result) => {
  console.log(result);
});

// Todos.findOneAndRemove
// Todos.findByIdAndRemove

Todos.findOneAndRemove({ _id: 'iuhfihi' }).then((todos) => {

});
// Todos.findByIdAndRemove('azd').then((todos) => {
//   console.log(todos);
// });
