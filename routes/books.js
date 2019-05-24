import BooksController from '../controllers/books';

export default(app) => {
  const booksController = new BooksController(app.datasource.models.Books);

  app.route('/books').get((req, res) => {
    booksController.getAll()
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  app.route('/books').post((req, res) => {
    booksController.create(req.body)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  app.route('/books/:id').get((req, res) => {
    booksController.getById(req.params)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  app.route('/books/:id').put((req, res) => {
    booksController.update(req.body, req.params)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });


  app.route('/books/:id').delete((req, res) => {
    booksController.delete(req.params)
      .then((response) => {
        res.sendStatus(response.statusCode);
      });
  });
};
