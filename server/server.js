require('.././config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todos } = require('./models/todos');
var { User } = require('./models/users');
var { authentication } = require('./middleware/authenticate.js');

var app = express();
const port = process.env.PORT;

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

// Route post users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();

    // res.json(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((err) => {
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

// Route update  todo
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  // Validate the id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id not valid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todos.findByIdAndUpdate(id, { $set: body }, { new: true }).then((Todos) => {
    if (!Todos) {
      return res.status(404).send();
    }

    res.json({ Todos });
  }).catch((e) => {
    res.status(400).send();
  });
});

// Test private Route
app.get('/users/me', authentication, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started server on ${port}`);
});

module.exports = { app };
