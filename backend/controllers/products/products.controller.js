//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const product = require('../../models/product');

// GET HTTP sorted and paginated data
router.get('/', (req, res) => {
    product.getAllProducts(req.query, (err, products, totalProducts) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load all tasks. Error: ${err}`
            });
        } else {
            res.status(200).write(JSON.stringify({
                success: true,
                tasks: products,
                totalTasks: totalProducts
            }, null, 2));
            res.end();

        }
    });
});

// GET HTTP id data
router.get('/:id', (req, res) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    product.getProductById(id, (err, tasks) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to load single task. Error: ${err}`
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

//POST HTTP method to add task
router.post('/', (req, res, next) => {
    let newTask = new product({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        module: req.body.module
    });
    product.addProduct(newTask, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to create a new task. Error: ${err}`
            });

        } else
            res.status(200).json({
                success: true,
                message: "Added successfully."
            });

    });
});

//DELETE HTTP method to delete task. Here, we pass in a param which is the object id.
router.delete('/:id', (req, res, next) => {
    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
    //Call the model method deleteListById
    product.deleteProductById(id, (err, list) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to delete the task. Error: ${err}`
            });
        } else if (list) {
            res.status(200).json({
                success: true,
                message: "Deleted successfully"
            });
        } else {
            res.status(501).json({
                success: false,
                message: `Failed to delete the task. Unknown Error.`
            });
        }
    });
});

//PUT HTTP method to update task. Here, we pass in id and updated task in body.
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    product.updateById(id, req.body.task, (err, updatedTask) => {
        if (err) {
            res.status(501).json({
                success: false,
                message: `Failed to update the task. Error: ${err}`
            });
        } else if (updatedTask) {
            res.status(200).json({
                success: true,
                message: "Updated successfully"
            });
        } else {
            res.status(501).json({
                success: false,
                message: `Failed to update the task. Unknown Error.`
            });
        }
    })
});

module.exports = router;