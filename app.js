import express from 'express';
import config from './config/config';
import datasource from './config/datasource';
 
const app = express();
app.config = config;
app.set('port',7000);
app.datasource = datasource(app);

const Books = app.datasource.models.Books;

app.route('/books').get((req,res) =>{
    Books.findAll({})
    .then(result=>res.json(result))
    .catch(err => res.status(412));
});

export default app;