let opcion;
let librosSeleccionados = [];

const recargoCuota3 = 10;
const recargoCuota6 = 15;

const libros = [
  { titulo: "Love At First Lie", precio: 3000, cantidad: 0, id: 1 },
  { titulo: "Shut Up", precio: 2500, cantidad: 0, id: 2 },
  {
    titulo: "Kings, Queens, and Fucked Up Things",
    precio: 4000,
    cantidad: 0,
    id: 3,
  },
  {
    titulo: "Traitors, Queens, and Fucked Up Twins",
    precio: 4500,
    cantidad: 0,
    id: 4,
  },
];

const root = document.querySelector("#root");

const tituloProductos = document.createElement("h2");
tituloProductos.innerText = "Productos";
tituloProductos.classList.add("titulo");
root.appendChild(tituloProductos);

const contenedor = document.createElement("div");
contenedor.classList.add("contenedor-articulos");
root.appendChild(contenedor);

const tituloCarrito = document.createElement("h2");
tituloCarrito.classList.add("titulo");
tituloCarrito.innerText = "Tu carrito";
root.appendChild(tituloCarrito);

const carrito = document.createElement("ul");
carrito.classList.add("carrito");
root.appendChild(carrito);

const contenedor2 = document.createElement("div");
contenedor2.classList.add("contenedor2");
root.appendChild(contenedor2);

const contenedor3 = document.createElement("div");
contenedor3.classList.add("contenedor3");
contenedor2.appendChild(contenedor3);

const cuotas = document.createElement("select");
cuotas.classList.add("select-cuotas");
cuotas.innerHTML = `
                    <option>Seleccione cantidad de cuotas</option>
                    <option value="1">1 cuota (sin recargo)</option>
                    <option value="2">3 cuotas (10% de recargo)</option>
                    <option value="3">6 cuotas (15% de recargo)</option>
`;
cuotas.addEventListener("change", calcularTotal);
contenedor3.appendChild(cuotas);
console.log(cuotas);

const precioTotal = document.createElement("h3");
precioTotal.classList.add("total");
precioTotal.innerText = "Total: $0";
contenedor3.appendChild(precioTotal);

const comprar = document.createElement("button");
comprar.classList.add("boton");
comprar.innerText = "Comprar";
contenedor3.appendChild(comprar);

function agregarAlCarro() {
  let idBoton = 0;
  carrito.textContent = "";
  librosSeleccionados.forEach((libro) => {
    let li = document.createElement("li");
    li.innerHTML = `
                    <h3>${libro.titulo}</h3>
                    <span>$${libro.precio * libro.cantidad}</span>
                    <span>${libro.cantidad}</span>
    `;
    let boton = document.createElement("button");
    boton.classList.add("boton-borrar");
    boton.innerText = "X";
    boton.id = idBoton;
    idBoton += 1;
    boton.dataset.item = libro;
    boton.addEventListener("click", borrarItemCarro);
    li.appendChild(boton);

    carrito.appendChild(li);
  });
  calcularTotal();
}

function borrarItemCarro(evento) {
  let indice = evento.currentTarget.id;

  if (librosSeleccionados[indice].cantidad == 1) {
    librosSeleccionados.splice(indice, 1);
  } else {
    librosSeleccionados[indice].cantidad -= 1;
  }

  agregarAlCarro();
  calcularTotal();
}

libros.forEach((libro) => {
  let article = document.createElement("article");
  article.classList.add("libro");
  article.innerHTML = `
  <h3>${libro.titulo}</h3>
  <p>$${libro.precio}</p>
  `;

  let boton = document.createElement("button");
  boton.classList.add("boton");
  boton.innerText = "Agregar al carrito";
  boton.addEventListener("click", function () {
    // Busco si ya existe el libro
    let indiceLibro = librosSeleccionados.indexOf(libro);
    if (indiceLibro == -1) {
      libro.cantidad = 1;
      librosSeleccionados.push(libro);
    } else {
      librosSeleccionados[indiceLibro].cantidad += 1;
    }
    agregarAlCarro();
    calcularTotal();
    console.log(librosSeleccionados);
  });
  article.appendChild(boton);
  contenedor.appendChild(article);
});

function calcularTotal() {
  let total = 0;
  let totalCarrito = document.querySelector(".total");
  librosSeleccionados.forEach((libro) => {
    const precio = libro.precio;
    total = total + precio * libro.cantidad;
  });

  const cuotaSeleccionada = document.getElementsByClassName("select-cuotas");

  if (cuotaSeleccionada[0].selectedIndex === 2) {
    total = total * (recargoCuota3 / 100 + 1);
  } else if (cuotaSeleccionada[0].selectedIndex === 3) {
    total = total * (recargoCuota6 / 100 + 1);
  }

  totalCarrito.innerHTML = `Total: $${total.toFixed(2)}`;
  agregarLS();
}

function agregarLS() {
  localStorage.setItem("carrito", JSON.stringify(librosSeleccionados));
}

window.onload = () => {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    librosSeleccionados = storage;
    agregarAlCarro();
  }
};
