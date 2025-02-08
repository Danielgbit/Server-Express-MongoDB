const socket = io();

// Función para enviar mensajes
function enviarMensaje() {
    const input = document.getElementById("mensaje");
    const mensaje = input.value;

    if (mensaje.trim() !== "") {
        socket.emit("mensaje", mensaje);
        input.value = "";
    }
}

// Escuchar mensajes del servidor y agregarlos a la lista
socket.on("mensaje", (mensaje) => {
    const ul = document.getElementById("mensajes");
    const li = document.createElement("li");
    li.textContent = mensaje;
    ul.appendChild(li);
});
