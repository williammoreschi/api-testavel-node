import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';

const app = express();
app.config = config;
app.set('port', 7000);
app.datasource = datasource(app);
app.use(bodyParser.json());
booksRouter(app);
usersRouter(app);


export default app;
