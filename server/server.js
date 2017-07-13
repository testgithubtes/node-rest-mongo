var express = require ('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todos} = require ('./models/todos');
var {User} = require ('./models/users')

var app = express();


// app.get('/todos',(req,res) =>{
//
// });

app.use(bodyParser.json());


// Route todos
app.post('/todos',(req,res) =>{
  var todo = new Todos({
    text : req.body.text,
    completed :req.body.completed
  })
  todo.save().then((doc) =>{
    res.send(doc);
  },(e) =>{
    res.status(400).send(e);
  })
});

// Route user
app.post('/user',(req,res) => {
  var user = new User({
    email : req.body.email
  })
  user.save().then((doc) =>{
    res.send(doc)
  },(err) =>{
    res.status(400).send(err);
  })
})
app.listen(3000,() => {
  console.log('start server on port 3000');
})
