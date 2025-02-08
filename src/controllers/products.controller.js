const ProductManager = require('../data/products');
const productManager = new ProductManager();

const getProducts = async (req, res) => {
    const data = productManager.getProducts();
    return res.status(200).send(data);
};

const addProduct = async (req, res) => {
        try {

            const { title, description, price } = req.body;

            if (!title || !description || !price) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            productManager.addProduct(req.body);
            
            res.status(201).send('Product successfully created');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
};

const getProductById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json('id not found');
        };
        const data = productManager.getProductById(req.params.id);
        return res.status(200).send(data);
    } catch (error) {
        res.status(400).send('id not found');
    }
};


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        productManager.deleteProduct(productId);
        res.status(410).send('Product delete successfully')
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedFields = req.body;
        
        const updatedProduct = productManager.updateProduct(productId, updatedFields);
        res.status(200).json(updatedProduct);
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