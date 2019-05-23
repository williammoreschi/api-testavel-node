import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';

const app = express();
app.config = config;
app.set('port', 7000);
app.datasource = datasource(app);
app.use(bodyParser.json());


const Books = app.datasource.models.Books;


app.route('/books').get((req, res) => {
  Books.findAll({})
    .then(result => res.json(result))
    .catch(() => res.status(412));
});

app.route('/books').post((req, res) => {
  Books.create(req.body)
    .then(result => res.json(result))
    .catch(() => res.status(412));
});

app.route('/books/:id').get((req, res) => {
  Books.findOne({ where: req.params })
    .then(result => res.json(result))
    .catch(() => res.status(412));
});

app.route('/books/:id').put((req, res) => {
  Books.update(req.body, { where: req.params })
    .then(result => res.json(result))
    .catch(() => res.status(412));
});


app.route('/books/:id').delete((req, res) => {
  Books.destroy({ where: req.params })
    .then(() => res.sendStatus(204))
    .catch(() => res.status(412));
});

export default app;
