const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.controller');

router.get('/', getProducts);  //Llamar todos los productos

/* router.get('/:id', getProductById); //Llamar producto por id

router.post('/add', addProduct); //Agregar producto

router.put('/:pid', updateProduct); // Ruta para actualizar un producto

router.delete('/:pid', deleteProduct); // Ruta para eliminar un producto */

module.exports = router;