import jwt from 'jwt-simple';

describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  const defaultBook = {
    id: 1,
    name: 'Default Books',
    description: 'Text Books',
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'Default User',
        email: 'default@default.com',
        password: '123456',
      }))
      .then((user) => {
        Books
          .destroy({ where: {} })
          .then(() => {
            Books.create(defaultBook)
              .then(() => {
                token = jwt.encode({ id: user.id }, jwtSecret);
                done();
              });
          });
      });
  });

  describe('Route GET /books', () => {
    it('should return list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));


      request
        .get('/books')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, booksList);
          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .get('/books/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route POTS /books', () => {
    it('should creat a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
      const newBook = {
        id: 2,
        name: 'newBook',
        description: 'Text Books',
      };
      request
        .post('/books')
        .set('Authorization', `bearer ${token}`)
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, book);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'Tralalala',
        description: 'Tralalala',
      };
      const updateCount = Joi.array().items(1);
      request
        .put('/books/1')
        .set('Authorization', `bearer ${token}`)
        .send(updateBook)
        .end((err, res) => {
          joiAssert(res.body, updateCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
