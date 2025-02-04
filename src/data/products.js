class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 1;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if(!product) throw new Error('Producto no encontrado');
        return product;
    }
}

module.exports = ProductManager;