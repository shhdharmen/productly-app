const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const productsCtrl = require('./controllers/products/products.controller');
const errorHandler = require('./_helpers/error-handler');

const port = 3031;

const app = express();
var http = require('http').Server(app);

const io = require('socket.io')(http);
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

http.listen(port, () => {
    console.log('Server listening on port ' + port);
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('newProduct', function (newProduct) {
        io.emit('newProduct', newProduct);
    });
});