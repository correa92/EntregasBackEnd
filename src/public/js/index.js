const socket = io();

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("nombre").value;
  const priceInput = document.getElementById("precio").value;

  const addProduct = {
    name: nameInput,
    price: priceInput,
  };
  socket.emit("message", addProduct);
});

socket.on("paraTodos", (data) => {
  if (data.remove) {
    const producto = document.getElementById(`producto_${data.remove}`);
    if (!producto) {
      return console.log("el id no existe");
    }
    return producto.remove();
  }
  const lista = document.getElementById("lista");
  const li = document.createElement("li");
  li.className = "container";
  li.innerHTML = `
  <p>Nombre:${data.name}</p>
  <p>Precio:${data.price}</p>`;
  lista.appendChild(li);
});

const formRemove = document.getElementById("formRemove");
formRemove.addEventListener("submit", (e) => {
  e.preventDefault();
  const idInput = document.getElementById("idProduct").value;
  socket.emit("message", { remove: idInput });
});
