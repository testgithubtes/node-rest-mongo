const expect = require('expect');
const request = require('supertest');

const { ObjectID } = require('mongodb');
const { app } = require('./../server');
const { Todos } = require('./../models/todos');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completetd: true,
  completedAt: 333,
},
];
beforeEach((done) => {
  Todos.remove({}).then(() => {
      Todos.insertMany(todos);
    })
    .then(() => done());
});

// Test /todos post
describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'test todo text';
    var completed = false;

    request(app)
      .post('/todos')
      .send({
        text: text,
        completed: completed,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.completed).toBe(completed);
        expect(res.body.text).toBe(text);

      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todos.find({ text }).then((todo) => {
          expect(todo.length).toBe(1);
          expect(todo[0].text).toBe(text);
          expect(todo[0].completed).toBe(completed);
          done();
        }).catch((e) => done(e));
      });
  });
  it('Should not create todos with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todos.find().then((todo) => {
          expect(todo.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

// test  get /todos
describe('Get /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.Todos.length).toBe(2);
      })
      .end(done);
  });
});

// test get /todos/:id
describe('Get /todos/:id', () => {
  it('Should get one todos selon id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.Todos.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 if todo not found', (done) => {
    var idTest = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${idTest}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-object ids', (done)=> {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

// test delete /todos/:id
describe('Delete /todos/:id', () => {
  it('should remove a todo', (done) => {
    var idTest = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${idTest}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.Todos._id).toBe(idTest);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todos.findById(idTest).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var idTest = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${idTest}`)
      .expect(404)
      .end(done);
  });
  it('Should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/124ZA')
      .expect(404)
      .end(done);
  });
});

describe('Patch /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'This should be the new text';
    request(app)
     .patch(`/todos/${id}`)
     .send({
        completed: true,
        text,
      })
     .expect(200)
     .expect((res) => {
        expect(res.body.Todos.text).toBe(text);
        expect(res.body.Todos.completed).toBe(true);
        expect(res.body.Todos.completedAt).toBeA('number');
      })
     .end(done);
  });
  it('dhould clear completedAt when todo is not complete', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'This should be the new text';
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.Todos.text).toBe(text);
        expect(res.body.Todos.completed).toBe(false);
        expect(res.body.Todos.completedAt).toNotExist();
      })
      .end(done);
  });
});
