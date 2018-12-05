const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ProductList = module.exports = mongoose.model('ProductList', ProductSchema);

module.exports.getAllProducts = (callback) => {
    try {
        ProductList.find(function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result);
        });
    } catch (err) {
        callback(err, null);
    }
};

module.exports.getProductById = (id, callback) => {
    let query = { _id: id };
    ProductList.find(query, callback);
};

module.exports.addProduct = (newProduct, callback) => {
    newProduct.save(function (err, product) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, product);
        }
    });
};

module.exports.updateById = (id, updatedProduct, callback) => {
    ProductList.findByIdAndUpdate(id, {
        $set: {
            name: updatedProduct.name,
            quantity: updatedProduct.quantity,
            price: updatedProduct.price
        }
    }, {
            new: true
        }, function (err, res) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, res);
            }
        });
};