const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../models/products.json');
        
        /*         this.products = this.loadProducts();
        this.currentId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1; */
    }


    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    } 
/*
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }
 */

/*     getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }

    addProduct(title, description, code, price) {
        const existingProduct = this.products.find(p => p.code === code);
        if (existingProduct) {
            throw new Error('El código del producto ya existe');
        }

        const newProduct = {
            id: this.currentId++,
            title,
            description,
            code,
            price,
        };

        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedFields,
            id: this.products[productIndex].id, // Asegurar que el ID no se modifique
        };

        this.saveProducts();
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        const deletedProduct = this.products.splice(productIndex, 1);
        this.saveProducts();
        return deletedProduct[0];
    } */
}

module.exports = ProductManager;