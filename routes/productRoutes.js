const express = require('express');
const router = express.Router();
const {createProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/productControllers')



router.get('/', getProducts); // Get All Products
router.get('/:id', getProduct); // Get Specific Product
router.post('/', createProduct); // Add Product to Database
router.put('/:id', updateProduct); // Edit & Update Product
router.delete('/:id', deleteProduct); //Delete a product


module.exports = router;