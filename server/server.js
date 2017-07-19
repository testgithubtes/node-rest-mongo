var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todos } = require('./models/todos');
var { User } = require('./models/users');

var app = express();

app.use(bodyParser.json());

// Route post todos
app.post('/todos', (req, res) => {
  var todo = new Todos({
    text: req.body.text,
    completed: req.body.completed,
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// Route post user
app.post('/user', (req, res) => {
  var user = new User({
    email: req.body.email,
  });
  user.save().then((doc) => {
    res.json(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// Route get todos
app.get('/todos', (req, res) => {
  Todos.find().then((Todos) => {
    res.json({ Todos });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('start server on port 3000');
});

// Get One todos
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send('id not valid');
  }

  Todos.findById(id).then((Todos) => {
    if (!Todos) {
      return res.status(404).send('id is empty');
    }

    res.json({ Todos });
  }).catch((e) => {
    res.status(400).send('Unable to fetch from db');
  });
});

module.exports = { app };
