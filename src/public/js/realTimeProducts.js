const socket = io();

// 🔹 Recibir actualización de productos
socket.on("updateProducts", (products) => {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Limpiar la lista antes de actualizar

    products.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("card-product");
        // Hacer que el título del producto sea un enlace a la vista de detalle
        li.innerHTML = `<a href="/products/${product.id}">
                            <strong class="title">${product.title}</strong>
                            <strong class="price">$ ${product.price}</strong>
                        </a>
                        <button class="button-delete-p" onclick="deleteProduct('${product.id}')"><i class="fa-solid fa-circle-minus"></i></button>
                        <a href="/editproduct/${product.id}">
                            <button class="button-update-p"><i class="fa-solid fa-pen"></i></button>
                            <a href="/products/${product.id}" class="button-detail-p"><i class="fa-solid fa-circle-info"></i></a>
                        </a>`;
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