const productos = [
  {
    id: 1,
    nombre: "Camisa Casual",
    categoria: "Camisas",
    precio: 65,
    imagen: "img/camisa.jpg"
  },
  {
    id: 2,
    nombre: "Pantalón Jean",
    categoria: "Pantalones",
    precio: 90,
    imagen: "img/jean.jpg"
  },
  {
    id: 3,
    nombre: "Abrigo elegante",
    categoria: "Abrigos",
    precio: 150,
    imagen: "img/Abrigo.jpg"
  },
  {
    id: 4,
    nombre: "Gorra Negra",
    categoria: "Accesorios",
    precio: 35,
    imagen: "img/gorra.jpg"
  }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img" />
      <h3>${producto.nombre}</h3>
      <p>Categoría: ${producto.categoria}</p>
      <p>Precio: S/ ${producto.precio}</p>
      <label for="talla-${producto.id}">Talla:</label>
      <select id="talla-${producto.id}">
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const talla = document.getElementById(`talla-${id}`).value;

  carrito.push({
    ...producto,
    talla: talla
  });

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";

  let suma = 0;
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} (Talla: ${item.talla}) - S/ ${item.precio}`;
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => eliminarDelCarrito(index);
    li.appendChild(btn);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toFixed(2);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = () => {
  mostrarProductos();
  actualizarCarrito();
};