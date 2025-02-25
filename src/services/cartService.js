const axios = require("axios");

const API_URL = "http://localhost:8080/api/carts"; // Ajusta según tu configuración

// Obtener un carrito por ID
const getCartById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error.message);
        return null;
    }
};

const postCreateCart = async () => {
    try {
        const response = await axios.post(`http://localhost:8080/api/carts/created`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el producto con ID ${id}:`, error.message);
        return null;
    }
};

module.exports = {getCartById, postCreateCart}