var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todos } = require('./models/todos');
var { User } = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

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

// Route Get One todos
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

// Route detele One todos
app.delete('/todos/:id', (req, res) => {
  // Get the id
  var id = req.params.id;

  // Validate the id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id not valid');
  }

  //Remove todo by Id
  Todos.findByIdAndRemove(id).then((Todos) => {
    if (!Todos) {
      return res.status(404).send('id is already empty');
    }

    res.json({ Todos });
  }).catch((e) => {
    res.status(400).send('Unable to delete from db');
  });
});
app.listen(port, () => {
  console.log(`Started server on ${port}`);
});

module.exports = { app };
