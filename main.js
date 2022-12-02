let opcion;
let librosSeleccionados = "Ha seleccionado:";

const precioLibro1 = 100;
const precioLibro2 = 200;
const precioLibro3 = 300;
const precioLibro4 = 400;

const recargoCuota3 = 10;
const recargoCuota6 = 25;

let subTotal = 0;

console.log("1) Libro 1");
console.log("2) Libro 2");
console.log("3) Libro 3");
console.log("4) Libro 4");
console.log("Presione 0 para dejar de comprar");

opcion = parseInt(prompt("Indique el número del libro que desea comprar:"));

while (opcion != 0) {
  if (opcion >= 1 && opcion <= 4) {
    librosSeleccionados = librosSeleccionados + " " + opcion.toString();

    switch (opcion) {
      case 1:
        subTotal = subTotal + precioLibro1;
        break;
      case 2:
        subTotal = subTotal + precioLibro2;
        break;
      case 3:
        subTotal = subTotal + precioLibro3;
        break;
      case 4:
        subTotal = subTotal + precioLibro4;
        break;
    }
  }

  opcion = parseInt(
    prompt(
      "¿Desea agregar otro producto al carrito? Ingrese el número del libro que quiere añadir, o presione 0 para finalizar la compra."
    )
  );
}

console.log(`${librosSeleccionados}, el total es: $${subTotal} `);

let cuotas;

while (cuotas != 1 && cuotas != 3 && cuotas != 6) {
  console.log("Presione 1 si desea comprar en 1 cuota, sin recargo.");
  console.log(
    `Presione 3 si desea comprar en 3 cuotas, con un recargo del ${recargoCuota3}%.`
  );
  console.log(
    `Presione 6 si desea comprar en 6 cuotas, con un recargo del ${recargoCuota6}%.`
  );

  cuotas = parseInt(prompt("Indique el número de cuotas que desea:"));

  switch (cuotas) {
    case 1:
      console.log("Ha seleccionado 1 cuota.");
      break;

    case 3:
      console.log("Ha seleccionado 3 cuotas.");
      break;

    case 6:
      console.log("Ha seleccionado 6 cuotas.");
      break;

    default:
      console.log("Por favor, seleccione un método de pago válido.");
      break;
  }
}

function calcularTotal(subTotal, cuotas) {
  if (cuotas === 1) {
    return subTotal;
  } else if (cuotas === 3) {
    return subTotal * (recargoCuota3 / 100 + 1);
  } else if (cuotas === 6) {
    return subTotal * (recargoCuota6 / 100 + 1);
  } else {
    console.log(
      "Cantidad de cuotas inválidas. Por favor, revise el método de pago seleccionado."
    );
  }
}

function calcularCuotas(precio, cuotas) {
  return precio / cuotas;
}

let total = calcularTotal(subTotal, cuotas);

let valorCuotas = calcularCuotas(total, cuotas);

console.log(
  `El total a pagar es: $${total.toFixed(
    2
  )}. El valor de cada cuota es: $${valorCuotas.toFixed(2)} `
);
