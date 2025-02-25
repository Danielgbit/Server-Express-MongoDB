const axios = require("axios");

const API_URL = "http://localhost:8080/api/carts"; // Ajusta según tu configuración

// Obtener un carrito por ID
const getCartById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el carrito con ID ${id}:`, error.message);
        return null;
    }
};

// Crear un nuevo carrito
const postCreateCart = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/created`,
            {}, // Body vacío (si no necesitas enviar datos)
            { withCredentials: true } // Opciones de configuración
        );
        return response.data;
    } catch (error) {
        console.error(`Error al crear el carrito:`, error.message);
        return null;
    }
};

// Crear un nuevo product en el carrito
const postProductInCart = async ({cartId, productId}) => {
    try {
        const response = await axios.post(`${API_URL}/${cartId}/product/${productId}`,
            {}, // Body vacío (si no necesitas enviar datos)
            { withCredentials: true } // Opciones de configuración
        );
        return response.data;
    } catch (error) {
        console.error(`Error al agregar producto al carrito:`, error.message);
        return null;
    }
};

// Actualizar cantidad productInCart
const updateProductInCartQuantity = async ({cartId, productId, action}) => {
    try {
        const response = await axios.put(`${API_URL}/${cartId}/product/${productId}`,
            { action }, // Body vacío (si no necesitas enviar datos)
            { withCredentials: true } // Opciones de configuración
        );
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el producto en el carrito:`, error.message);
        return null;
    }
};

const deleteProductInCart = async ({cartId, productId}) => {
    try {
        const response = await axios.delete(`${API_URL}/${cartId}/product/${productId}`,
            {}, // Body vacío (si no necesitas enviar datos)
            { withCredentials: true } // Opciones de configuración
        );
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el producto en el carrito:`, error.message);
        return null;
    }
};

module.exports = { getCartById, postCreateCart, postProductInCart, updateProductInCartQuantity, deleteProductInCart };