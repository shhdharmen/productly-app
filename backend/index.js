const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const productsCtrl = require('./controllers/products/products.controller');
const errorHandler = require('./_helpers/error-handler');

const port = 3031;

const app = express();
//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Middleware for CORS
app.use(cors());


app.get('/', (req, res) => res.send('Invalid Page!'));


//Routing all HTTP requests to /product to product controller
app.use('/products', productsCtrl);


// global error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});