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
