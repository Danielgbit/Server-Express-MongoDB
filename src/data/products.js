const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Importar la función v4 de uuid

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "../models/products.json");
    this.products = this.getProducts();
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  addProduct(body) {
    const { title, price, description } = body;

    let products = [];
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      products = JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Error al leer el archivo de productos: ${error.message}`);
    }

    const newProduct = {
      id: uuidv4(),
      title: title,
      description: description,
      price: price
    };

    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');

    return newProduct;
  }


  getProductById(id) {
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(fileContent);
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      return [];
    }
  }

  deleteProduct(id) {

    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      const products = JSON.parse(fileContent);
    
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      const deletedProduct = products.splice(productIndex, 1);
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf-8');
      return deletedProduct[0];
    } catch (error) {
      console.log(error);
      
    }
  }

  /*
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
} */
}

module.exports = ProductManager;
