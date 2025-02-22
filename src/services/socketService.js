const { getProducts, addProduct, deleteProduct, updateProduct } = require("./productService");

const socketHandler = (io) => {
    io.on("connection", async (socket) => {
        console.log("Cliente conectado");

        // Enviar la lista de productos al conectar un cliente
        try {
            const response = await getProducts();
            if (response.status === "success") {
                socket.emit("updateProducts", response.payload);
            } else {
                console.error("Error de conexión al obtener productos");
            }
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }

        // Escuchar evento cuando el carrito se actualiza
        socket.on("updateCart", (cart) => {
            io.emit("cartUpdated", cart);
        });

        // Escuchar evento para agregar productos
        socket.on("addProduct", async (product) => {
            try {
                await addProduct(product);
                const response = await getProducts();
                io.emit("updateProducts", response.payload);
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        });

        // Escuchar evento para editar productos
        socket.on("editProduct", async (updatedProduct) => {
            try {
                await updateProduct(updatedProduct.id, updatedProduct);
                const response = await getProducts();
                io.emit("updateProducts", response.payload);
            } catch (error) {
                console.error("Error al actualizar producto:", error);
            }
        });

        // Escuchar evento para eliminar productos
        socket.on("deleteProduct", async (productId) => {
            try {
                await deleteProduct(productId);
                const response = await getProducts();
                io.emit("updateProducts", response.payload);
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });
    });
};

module.exports = socketHandler;
