const ProductManager = require('../data/products');
const ProductModel = require('../models/product.model');
const { v4: uuidv4 } = require('uuid'); // Para generar UUIDs


const getProducts = async (req, res) => {
    const products = await ProductModel.find();
    return res.status(200).send({ 
        status: 'success', 
        payload: products
    });
};

const addProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).send({ error: "Todos los campos son obligatorios" });
        }

        const newProduct = {
            title: title,
            description: description,
            price: price
        };

        const result = await ProductModel.insertOne(newProduct);

        return res.status(201).send({ status: 'success', payload: result });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {

        const uid = req.params.id;

        if (!uid) {
            return res.status(400).json('id not found');
        };

        const response = await ProductModel.findById({ _id: uid });

        return res.status(200).send({ status: 'success', payload: response });

    } catch (error) {
        res.status(400).send('id not found');
    }
};


const deleteProduct = async (req, res) => {
    try {
        const uid = req.params.id;

        const response = await ProductModel.deleteOne({ _id: uid });

        res.status(200).send({ status: 'success', payload: response });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



const updateProduct = async (req, res) => {
    try {
        const uid = req.params.id;
        const { title, description, price } = req.body;


        const updateProduct = {
            title: title,
            description: description,
            price: price
          };
        
        const response = await ProductModel.updateOne({ _id: uid }, updateProduct );
        
        res.status(200).send({ status:'success', payload: response });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Exportar controladores
module.exports = {
    getProducts,
    addProduct,
    getProductById,
    deleteProduct,
    updateProduct
};