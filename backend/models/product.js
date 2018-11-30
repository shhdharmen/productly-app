//Require mongoose package
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

//Define BucketlistSchema with title, description and category
let ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: ['high', 'medium', 'low']
    },
    module: {
        type: String,
        required: true,
        enum: ['client', 'clientAdmin', 'support', 'supportAdmin', 'seller', 'sellerAdmin']
    }
});
ProductSchema.plugin(mongoosePaginate);

const ProductList = module.exports = mongoose.model('ProductList', ProductSchema);

//BucketList.find() returns all the lists
module.exports.getAllProducts = (query, callback) => {
    const sort = query.sort;
    const order = query.order;
    const page = query.page;
    const limitTo = query.limitTo;
    try {
        console.log("backend/models/Task.js | getAllTasks");
        ProductList.paginate({}, { sort: { [sort]: order }, page: page, limit: +limitTo }, function (err, result) {
            if (err) {
                callback(err, null);
            }
            callback(null, result.docs, result.total);
        });
    } catch (err) {
        console.log('err', err);
    }
};

module.exports.getProductById = (id, callback) => {
    let query = { _id: id };
    ProductList.find(query, callback);
};

module.exports.addProduct = (newTask, callback) => {
    newTask.save(callback);
};

module.exports.deleteProductById = (id, callback) => {
    let query = { _id: id };
    ProductList.remove(query, callback);
};

module.exports.updateById = (id, updatedTask, callback) => {
    ProductList.findByIdAndUpdate(id, {
        $set: {
            title: updatedTask.title,
            description: updatedTask.description,
            category: updatedTask.category,
            module: updatedTask.module
        }
    }, {
        new: true
    }, callback);
};