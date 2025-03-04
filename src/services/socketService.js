const { getProducts, addProduct, deleteProduct, updateProduct } = require("./productService");

const socketHandler = (io) => {
    io.on("connection", async (socket) => {
        console.log(`Cliente conectado con id: ${socket.id}`);

        // Enviar la lista de productos al conectar un cliente
        try {
            const response = await getProducts(1, 30);
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
                const response = await getProducts(1, 30);
                io.emit("updateProducts", response.payload);
            } catch (error) {
                console.error("Error al agregar producto:", error);
            }
        });

        socket.on("editProduct", async (updatedProduct, callback) => {
            try {
                console.log("Recibiendo producto actualizado:", updatedProduct);
                const result = await updateProduct(updatedProduct.id, updatedProduct);
        
                if (result.success === false) {
                    callback({ success: false, message: result.message });
                    return;
                }
        
                const response = await getProducts(1, 30);
                io.emit("updateProducts", response.payload); // Emitir actualización global
                callback({ success: true });
            } catch (error) {
                console.error("Error al actualizar producto:", error);
                callback({ success: false, message: "Error interno del servidor" });
            }
        });
        
        

        // Escuchar evento para eliminar productos
        socket.on("deleteProduct", async (productId) => {
            try {
                await deleteProduct(productId);
                const response = await getProducts(1, 30);
                io.emit("updateProducts", response.payload);
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });


        socket.on("addToCart", (product) => {
            console.log("Producto agregado al carrito:", product);
            io.emit("updateCart", product); // Emitir evento para actualizar el carrito
        });
    });
};

module.exports = socketHandler;
