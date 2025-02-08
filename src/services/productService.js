const axios = require("axios");

const API_URL = "http://localhost:8080/api/products"; // Ajusta según tu configuración

// Obtener todos los productos
const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        return [];
    }
};

// Obtener un producto por ID
const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error.message);
        return null;
    }
};

// Actualizar un producto por ID
const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id}:`, error.message);
        return null;
    }
};

// Agregar un producto
const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/add`, product);
        return response.data;
    } catch (error) {
        console.error("Error al agregar producto:", error.message);
        return null;
    }
};

// Eliminar un producto por ID
const deleteProduct = async (id) => {
    try {
        
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        console.log(response);
        
    } catch (error) {
        console.error(`Error al eliminar el producto con ID ${id}:`, error.message);
        return null;
    }
};

// Exportar funciones
module.exports = { getProducts, getProductById, addProduct, deleteProduct, updateProduct };
