const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
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
            console.log(result);
            callback(null, result);
        });
    } catch (err) {
        console.log('err', err);
    }
};

module.exports.getProductById = (id, callback) => {
    let query = { _id: id };
    ProductList.find(query, callback);
};

module.exports.addProduct = (newProduct, callback) => {
    newProduct.save(callback);
};

module.exports.deleteProductById = (id, callback) => {
    let query = { _id: id };
    ProductList.remove(query, callback);
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
    }, callback);
};