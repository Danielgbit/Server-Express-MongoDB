const ProductManager = require('../data/products');

const getProducts = async (req, res) => {
    res.send('productos')
/*     try {
        const limit = parseInt(req.query.limit) || null;
        const products = productManager.getProducts();
        
        if(limit && !isNaN(limit)) {
            return res.json(products.slice(0, limit));
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } */
};

const getProductById = async (req, res) => {
    res.send('id')
/*     try {
        const product = productManager.getProductById(parseInt(req.params.pid));
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    } */
};

// Exportar controladores
module.exports = {
    getProducts,
    getProductById
};