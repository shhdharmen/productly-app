const mongoose = require('mongoose');

module.exports.connect = function () {
    mongoose.connect('mongodb://localhost/productly-app-db');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Successfully connected to db.');
    });
};