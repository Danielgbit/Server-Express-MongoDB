const { default: mongoose } = require('mongoose');
const ProductModel = require('../models/product.model');


const getProducts = async (req, res) => {

    const { page = 1, limit = 3 } = req.query; 

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    try { 
        const result = await ProductModel.paginate({}, options);  
        
        return res.status(200).send({
            status: 'success',
            payload: result.docs,
            totalDocs: result.totalDocs,
            limit: result.limit,
            page: result.page,
            pagingCounter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
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