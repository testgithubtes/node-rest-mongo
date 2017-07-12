const {MongoClient,ObjectID} = require ('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todoapp', (err,db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server',err);

  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('todos').deleteMany({text : 'eat humburg'}).then((result) =>{
  //   console.log(result);
  // });
  // deleteOne
  // db.collection('todos').deleteOne({text : 'eat humburg'}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete
  // db.collection('todos').findOneAndDelete({completed : false}).then((res) =>{
  //   console.log(res);
  // })
  // Delete Many jen
  db.collection('users').deleteMany({name : 'jen'}).then((res) =>{
    console.log(res);
  })
  // find and delete one
  db.collection('users').findOneAndDelete({_id : new ObjectID('5965e9301f678f16eb195d05')}).then((res) =>{
    console.log(JSON.stringify(res,undefined,2));
  })
    // db.close();
});
