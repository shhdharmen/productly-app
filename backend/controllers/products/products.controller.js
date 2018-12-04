//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const product = require('../../models/product');
let socketIO;

// GET HTTP data
router.get('/', (req, res) => {
    product.getAllProducts((err, products) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load all tasks. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                products: products
            }, null, 2));
            res.end();

        }
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    product.getProductById(id, (err, tasks) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load single product. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                tasks: tasks
            }, null, 2));
            res.end();

        }
    });
});

//POST HTTP method to add product
router.post('/', (req, res, next) => {
    let newProduct = new product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });
    product.addProduct(newProduct, (err, product) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to create a new product. Error: ${err}`
            });

        } else
            res.status(200).json({
                success: true,
                message: "Added successfully.",
                product: product
            });
        socketIO.emit('newProduct', product);

    });
});

//DELETE HTTP method to delete product. Here, we pass in a param which is the object id.
router.delete('/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteProductById
    product.deleteProductById(id, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to delete the product. Error: ${err}`
            });
        } else if (list) {
            res.status(200).json({
                success: true,
                message: "Deleted successfully"
            });
        } else {
            res.status(501).json({
                success: false,
                message: `Failed to delete the product. Unknown Error.`
            });
        }
    });
});

//PUT HTTP method to update product. Here, we pass in id and updated product in body.
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    product.updateById(id, req.body.product, (err, updatedProduct) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to update the product. Error: ${err}`
            });
        } else if (updatedProduct) {
            res.status(200).json({
                success: true,
                message: "Updated successfully"
            });
        } else {
            res.status(501).json({
                success: false,
                message: `Failed to update the product. Unknown Error.`
            });
        }
    })
});

module.exports = function (io) {
    socketIO = io;
    socketIO.on('connection', function (socket) {
    });
    return router;
};