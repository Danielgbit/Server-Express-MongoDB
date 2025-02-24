document.addEventListener("DOMContentLoaded", async () => {
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
        try {
            const response = await fetch("/cart/create", { method: "POST" });
            const data = await response.json();
            if (data.status === "success") {
                cartId = data.payload._id;
                localStorage.setItem("cartId", cartId);
            }
        } catch (error) {
            console.error("Error al crear el carrito:", error);
        }
    }

    if (cartId) {
        document.getElementById("cart-link").href = `/cart/${cartId}`;
    }
});
