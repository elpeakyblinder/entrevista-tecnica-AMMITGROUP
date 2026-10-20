/*
2. Filtrado de productos
Dado el arreglo de productos, devuelve solo los que estén disponibles y cuesten menos de $500.
Ordena el resultado por precio ascendente.
const productos = [{id:1,nombre:"Mouse",precio:350,disponible:true},{id:2,nombre:"Teclado",precio:650,disponible:true},{id:3,nombre:"Cable",precio:120,disponible:false},{id:4,nombre:"Base",precio:280,disponible:true}];
*/

const productos = [
  { id: 1, nombre: "Mouse", precio: 350, disponible: true },
  { id: 2, nombre: "Teclado", precio: 650, disponible: true },
  { id: 3, nombre: "Cable", precio: 120, disponible: false },
  { id: 4, nombre: "Base", precio: 280, disponible: true }
];

function filtrarYOrdenarProductos(lista) {
  if (!Array.isArray(lista)) return [];

  return lista
    .filter(producto => producto.disponible && producto.precio < 500)
    .sort((a, b) => a.precio - b.precio);
}

console.log('=== PRODUCTOS ORIGINALES ===');
console.table(productos);

console.log('\n=== PRODUCTOS FILTRADOS Y ORDENADOS ===');
console.table(filtrarYOrdenarProductos(productos));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filtrarYOrdenarProductos };
}
