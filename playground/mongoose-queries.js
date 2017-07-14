const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todos } = require('./../server/models/todos');
const { User } = require('./../server/models/users');

// var id = '596751d59a17fe24f2b97408';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todos.find({
//   _id : id
// }).then((todos) => {
//   console.log('todos',todos);
// })
// Todos.findOne({
//   _id : id
// }).then((todo) => {
//   if(! todo) {
//    throw new Error('Id not found');
//   }
//   console.log('todos',todo);
// }).catch((err) => {
//   console.log('function err',err)
// })
// Todos.findById(id).then((todo) => {
//   if(! todo) {
//    throw new Error('Id not found');
//   }
//   console.log('todo by id',todo);
// }).catch((err) =>{
//   console.log('they are ',err);
// })
var id = '596544535ab2ea130731487e';
User.findById(id).then((user) => {
  if (!user) {
    throw new Error('Id of user not found');
  }console.log('user by id ', user);
}).catch((err) => {
  console.log('Problem', err);
});
