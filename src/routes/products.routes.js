const express = require('express');
const router = express.Router();

const {
    getProducts,
    addProduct,
    getProductById,
    deleteProduct,
    updateProduct
} = require('../controllers/products.controller');

router.get('/', getProducts);  //Llamar todos los productos

router.post('/add', addProduct); //Agregar producto

router.get('/:id', getProductById); //Llamar producto por id

router.delete('/delete/:id', deleteProduct); // Ruta para eliminar un producto

router.put('/update/:id', updateProduct); // Ruta para actualizar un producto

module.exports = router;