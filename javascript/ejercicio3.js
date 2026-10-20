// Ejercicio 3: Carrito de compras

function calcularTotal(carrito) {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    return { subtotal: 0, descuento: 0, total: 0 };
  }

  const subtotal = carrito.reduce((acumulado, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 0;
    return acumulado + (precio * cantidad);
  }, 0);

  const aplicaDescuento = subtotal > 1000;
  const descuento = aplicaDescuento ? subtotal * 0.10 : 0;
  const total = subtotal - descuento;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    descuento: Number(descuento.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}

// Casos de prueba
const carrito = [
  { precio: 400, cantidad: 2 },
  { precio: 150, cantidad: 3 }
];

console.log('=== CARRITO CON DESCUENTO (> $1000) ===');
console.log('Entrada:', carrito);
console.log('Resultado:', calcularTotal(carrito));

const carritoSinDescuento = [
  { precio: 200, cantidad: 2 },
  { precio: 100, cantidad: 1 }
];

console.log('\n=== CARRITO SIN DESCUENTO (<= $1000) ===');
console.log('Entrada:', carritoSinDescuento);
console.log('Resultado:', calcularTotal(carritoSinDescuento));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcularTotal };
}
