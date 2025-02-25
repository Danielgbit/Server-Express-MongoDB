const { default: mongoose } = require('mongoose');
const ProductModel = require('../models/product.model');


const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
    const limit = parseInt(req.query.limit) || 20; // Límite de productos por página (por defecto 10)
    const skip = (page - 1) * limit; // Cálculo de cuántos documentos saltar

    try {
        const products = await ProductModel.find()
            .skip(skip)
            .limit(limit);

        const totalProducts = await ProductModel.countDocuments(); // Total de productos en la base de datos

        return res.status(200).send({
            status: 'success',
            payload: products,
            totalPages: Math.ceil(totalProducts / limit), // Total de páginas
            currentPage: page,
            totalProducts: totalProducts,
            limit: limit // Pasa el límite a la vista
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al obtener los productos'
        });
    }
};


const addProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).send({ error: "Todos los campos son obligatorios" });
        }

        const newProduct = {
            _id: new mongoose.Types.ObjectId(), // Generar un ObjectId único
            title,
            description,
            price
        };

        const result = await ProductModel.create(newProduct);

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