document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const editProductForm = document.getElementById("editProductForm");

    if (!editProductForm) return;

    editProductForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedProduct = {
            id: document.getElementById("productId").value,
            title: document.getElementById("editTitle").value,
            price: Number(document.getElementById("editPrice").value),
            description: document.getElementById("editDescription").value,
        };

        socket.emit("editProduct", updatedProduct, (response) => {
            if (response.success) {
                window.location.href = "/realtimeproducts";
            } else {
                alert("Error al actualizar el producto: " + response.message);
            }
        });
    });
});
