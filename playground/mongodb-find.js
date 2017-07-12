const {MongoClient,ObjectID} = require ('mongodb');

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/todoapp', (err,db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server',err);

  }
  console.log('Connected to MongoDB server');
  db.collection('users').find({name : 'jen'}).toArray().then((doc) =>{
    console.log(JSON.stringify(doc,undefined,2));


  });
  // db.collection('todos').find().count().then((docs) => {
  //   console.log('ToDos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log('Unable to fetch todos',err)
  // })
  // db.close();
});
