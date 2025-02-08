const socket = io();

// 🔹 Recibir actualización de productos
socket.on("updateProducts", (products) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Limpiar la lista antes de actualizar

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${product.name}</strong> - $${product.price} 
                        <button onclick="deleteProduct('${product.id}')">❌</button>`;
        productList.appendChild(li);
    });
});

// 🔹 Manejo del formulario para agregar productos
document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;

    if (name && price) {
        const newProduct = { id: Date.now().toString(), name, price };
        socket.emit("addProduct", newProduct);

        document.getElementById("productForm").reset(); // Limpiar formulario
    }
});

// 🔹 Función para eliminar productos
function deleteProduct(productId) {
    socket.emit("deleteProduct", productId);
}
