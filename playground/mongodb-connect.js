const {MongoClient,ObjectID} = require ('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/todoapp', (err,db) => {
  if (err) {
    console.log('Unable to connect to mongodb server');

  }
  db.collection('users').insertOne({
    name : 'aze',
    age :35,
    location : 'paris'
  },(err,res) =>{
    if(err) {
      return console.log("unable to insert document",err);
    }
    console.log(JSON.stringify(res.ops,undefined,2));
    console.log(res.ops[0]._id.valueOf());
  })
  // db.collection('todos').insertOne({
  //   text : 'Something to do',
  //   completed : false
  // },(err,result) => {
  //   if(err) {
  //     return console.log('Unable to insert todos',err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // })
  db.close();
});
