const express = require('express');
const router = express.Router();

const {
    getProducts,
    addProduct,
/*     getProductById,
    updateProduct,
    deleteProduct */
} = require('../controllers/products.controller');

router.get('/', getProducts);  //Llamar todos los productos

router.post('/add', addProduct); //Agregar producto

/* router.get('/:id', getProductById); //Llamar producto por id


router.put('/:pid', updateProduct); // Ruta para actualizar un producto

router.delete('/:pid', deleteProduct); // Ruta para eliminar un producto */

module.exports = router;