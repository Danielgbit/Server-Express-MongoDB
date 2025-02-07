const ProductManager = require('../data/products');
const productManager = new ProductManager();

const getProducts = async (req, res) => {
    const data = productManager.getProducts();
    return res.status(200).send(data);
};

const addProduct = async (req, res) => {
        try {
            console.log("Cuerpo recibido:", req.body);

            const { title, description, price } = req.body;

            if (!title || !description || !price) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            productManager.addProduct({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            })
            
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

        productManager.getProductById(req.params.id);
        const data = await getProductById();
        return res.status(200).send(data)
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


/*
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
};*/

// Exportar controladores
module.exports = {
    getProducts,
    addProduct,
    getProductById,
    deleteProduct
/*  updateProduct,
    deleteProduct */
};