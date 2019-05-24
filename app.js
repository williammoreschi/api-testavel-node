import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';

const app = express();
app.config = config;
app.set('port', 7000);
app.datasource = datasource(app);
app.use(bodyParser.json());
const Books = app.datasource.models.Books;
booksRouter(app, Books);


export default app;
