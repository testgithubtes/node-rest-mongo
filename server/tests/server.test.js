const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todos } = require('./../models/todos');

const todos = [{
  text: 'First test todo',
}, {
  text: 'Second test todo',
},
];
beforeEach((done) => {
  Todos.remove({}).then(() => {
      Todos.insertMany(todos);
    })
    .then(() => done());
});

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
