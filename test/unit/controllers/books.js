import HttpStatus from 'http-status';
import BooksController from '../../../controllers/books';

describe('Controlles Books', () => {
  describe('Get All books: getAll()', () => {
    it('should  return list of books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectResponse = [{
        id: 1,
        name: 'teste 01',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      }];

      td.when(Books.findAll({})).thenResolve(expectResponse);

      const booksControllers = new BooksController(Books);
      return booksControllers.getAll()
        .then(response => expect(response.data).to.be.eql(expectResponse));
    });
  });
  describe('Get a book: getById()', () => {
    it('should  return a book', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectResponse = {
        id: 1,
        name: 'teste 01',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      };

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectResponse);

      const booksControllers = new BooksController(Books);
      return booksControllers.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectResponse));
    });
  });

  describe('Create a book: create()', () => {
    it('should  create a book', () => {
      const Books = {
        create: td.function(),
      };

      const requestBody = {
        name: 'newBook',
      };
      const expectResponse = {
        id: 1,
        name: 'teste 01',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      };

      td.when(Books.create(requestBody)).thenResolve(expectResponse);

      const booksControllers = new BooksController(Books);
      return booksControllers.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it('should  update an existing book', () => {
      const Books = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Update book',
      };
      const expectResponse = {
        id: 1,
        name: 'Update book',
        createdAt: '2016-05-23T15:36:44.692Z',
        updatedAt: '2016-05-23T15:36:44.692Z',
      };

      td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectResponse);

      const booksControllers = new BooksController(Books);
      return booksControllers.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectResponse));
    });
  });

  describe('Delete a book: delete()', () => {
    it('should  delete an existing book', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve();

      const booksControllers = new BooksController(Books);
      return booksControllers.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });
  });
});
