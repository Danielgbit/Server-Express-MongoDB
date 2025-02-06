const { log } = require('node:console');
const ProductManager = require('../data/products');
const productManager = new ProductManager();
const fs = require('fs');

const getProducts = async (req, res) => {
};

/* 
const getProductById = async (req, res) => {
    res.send('id')
    try {
        const product = productManager.getProductById(parseInt(req.params.pid));
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

/* const addProduct = async (req, res) => {
    try {
        res.status(200).json('TODOS LOS PRODUCTOS')

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;

        // Validar que no se intente actualizar el ID
        if (updatedFields.id) {
            return res.status(400).json({ error: 'No se puede actualizar el ID del producto' });
        }

        const updatedProduct = productManager.updateProduct(productId, updatedFields);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = productManager.deleteProduct(productId);
        res.json(deletedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}; */

// Exportar controladores
module.exports = {
    getProducts,
/*     getProductById,
    addProduct,
    updateProduct,
    deleteProduct */
};