const socket = io();

socket.on("updateProducts", (products) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Limpiar la lista antes de actualizar

    products.forEach(product => {
        const li = document.createElement("li");
        // Hacer que el título del producto sea un enlace a la vista de detalle
        li.innerHTML = `<a href="/products/${product.id}"; color: inherit;">
                            <strong>${product.title}</strong> - $${product.price}
                        </a>
                        <button onclick="deleteProduct('${product.id}')">❌</button>`;
        productList.appendChild(li);
    });
});

// 🔹 Manejo del formulario para agregar productos
document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("productTitle").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;


    if (title && price && description) {

        const newProduct = { title, price, description };
        socket.emit("addProduct", newProduct);

        document.getElementById("productForm").reset(); // Limpiar formulario
    }
});

// 🔹 Función para eliminar productos
function deleteProduct(productId) {
    socket.emit("deleteProduct", productId);
}
