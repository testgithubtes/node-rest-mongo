const {MongoClient,ObjectID} = require ('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todoapp', (err,db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server',err);

  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate
  db.collection('todos').findOneAndUpdate({
    _id : new ObjectID('5965d5e044be15e9040f9851')
  },{
    $set: {
      completed : true
    }},{
      returnOriginal : false

  }).then((result) =>{
    console.log(result);
  });

  // update users
  db.collection('users').findOneAndUpdate({
    _id : new ObjectID('596544535ab2ea130731487e')
  },{
    $inc :{
      age : +1
  },
    $set :{
      name: 'ghy'
    }
  },{
    returnOriginal : false
  }).then((res) =>{
    console.log(res);
  })
    // db.close();
});
