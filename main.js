let opcion;
let librosSeleccionados = [];

const recargoCuota3 = 10;
const recargoCuota6 = 25;

let subTotal = 0;

const libros = [
  { titulo: "Love At First Lie", precio: 3000, id: 1 },
  { titulo: "Shut Up", precio: 2500, id: 2 },
  { titulo: "Kings, Queens, and Fucked Up Things", precio: 4000, id: 3 },
  { titulo: "Traitors, Queens, and Fucked Up Twins", precio: 4500, id: 4 },
];

const root = document.querySelector("#root");

const contenedor = document.createElement("div");
contenedor.classList.add("contenedor-articulos");
root.appendChild(contenedor);

const carrito = document.createElement("ul");
carrito.classList.add("carrito");
root.appendChild(carrito);

function agregarAlCarro() {
  carrito.textContent = "";
  const carritoSinDuplicados = [...new Set(librosSeleccionados)];
  carritoSinDuplicados.forEach((libro) => {
    const numeroUnidadesItem = librosSeleccionados.reduce((total, itemId) => {
      return itemId === libro ? (total += 1) : total;
    }, 0);

    let li = document.createElement("li");
    li.innerHTML = `
                    <h3>${libro.titulo}</h3>
                    <span>$${libro.precio * numeroUnidadesItem}</span>
                    <span>${numeroUnidadesItem}</span>
    `;
    let boton = document.createElement("button");
    boton.classList.add("boton-borrar");
    boton.innerText = "X";
    boton.dataset.item = libro;
    boton.addEventListener("click", borrarItemCarro);
    li.appendChild(boton);

    carrito.appendChild(li);
  });
}

function borrarItemCarro(evento) {
  const botonClickeado = evento.target;
  console.log(botonClickeado);

  librosSeleccionados.filter((carritoId) => {
    return carritoId !== botonClickeado;
  });

  agregarAlCarro();
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
    librosSeleccionados.push(libro);
    agregarAlCarro();
    console.log(librosSeleccionados);
  });
  article.appendChild(boton);
  contenedor.appendChild(article);
});

// for (let i = 0; i < libros.length; i++) {
//   console.log(
//     `${libros[i].id}) ${libros[i].titulo}, valor: $${libros[i].precio}`
//   );
// }

// console.log("Presione 0 para dejar de comprar");

// opcion = parseInt(prompt("Indique el número del libro que desea comprar:"));

// while (opcion != 0) {
//   if (opcion >= 1 && opcion <= 4) {
//     librosSeleccionados.push(opcion);

//     switch (opcion) {
//       case 1:
//         subTotal = subTotal + libros[0].precio;
//         break;
//       case 2:
//         subTotal = subTotal + libros[1].precio;
//         break;
//       case 3:
//         subTotal = subTotal + libros[2].precio;
//         break;
//       case 4:
//         subTotal = subTotal + libros[3].precio;
//         break;
//     }
//   }

//   opcion = parseInt(
//     prompt(
//       "¿Desea agregar otro producto al carrito? Ingrese el número del libro que quiere añadir, o presione 0 para finalizar la compra."
//     )
//   );
// }

// console.log(
//   `Ha seleccionado: ${librosSeleccionados}, el total es: $${subTotal} `
// );

// let cuotas;

// while (cuotas != 1 && cuotas != 3 && cuotas != 6) {
//   console.log("Presione 1 si desea comprar en 1 cuota, sin recargo.");
//   console.log(
//     `Presione 3 si desea comprar en 3 cuotas, con un recargo del ${recargoCuota3}%.`
//   );
//   console.log(
//     `Presione 6 si desea comprar en 6 cuotas, con un recargo del ${recargoCuota6}%.`
//   );

//   cuotas = parseInt(prompt("Indique el número de cuotas que desea:"));

//   switch (cuotas) {
//     case 1:
//       console.log("Ha seleccionado 1 cuota.");
//       break;

//     case 3:
//       console.log("Ha seleccionado 3 cuotas.");
//       break;

//     case 6:
//       console.log("Ha seleccionado 6 cuotas.");
//       break;

//     default:
//       console.log("Por favor, seleccione un método de pago válido.");
//       break;
//   }
// }

// function calcularTotal(subTotal, cuotas) {
//   if (cuotas === 1) {
//     return subTotal;
//   } else if (cuotas === 3) {
//     return subTotal * (recargoCuota3 / 100 + 1);
//   } else if (cuotas === 6) {
//     return subTotal * (recargoCuota6 / 100 + 1);
//   } else {
//     console.log(
//       "Cantidad de cuotas inválidas. Por favor, revise el método de pago seleccionado."
//     );
//   }
// }

// function calcularCuotas(precio, cuotas) {
//   return precio / cuotas;
// }

// let total = calcularTotal(subTotal, cuotas);

// let valorCuotas = calcularCuotas(total, cuotas);

// console.log(
//   `El total a pagar es: $${total.toFixed(
//     2
//   )}. El valor de cada cuota es: $${valorCuotas.toFixed(2)} `
// );
