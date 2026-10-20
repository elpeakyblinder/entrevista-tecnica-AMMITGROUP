// Ejercicio 1: Validación de Formulario

function validarUsuario(nombre, correo, edad) {
  const errores = [];

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    errores.push('El nombre es obligatorio y no puede estar vacío.');
  }

  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || typeof correo !== 'string' || !regexCorreo.test(correo.trim())) {
    errores.push('El correo debe contener un formato válido con "@" y un dominio.');
  }

  const edadNumero = Number(edad);
  if (
    edad === null ||
    edad === undefined ||
    isNaN(edadNumero) ||
    !Number.isInteger(edadNumero) ||
    edadNumero < 18
  ) {
    errores.push('La edad debe ser un número entero mayor o igual a 18 años.');
  }

  return {
    valido: errores.length === 0,
    errores
  };
}

// Casos de prueba
console.log('=== CASO DE PRUEBA 1: Datos válidos ===');
const entrada1 = { nombre: 'Ana García', correo: 'ana.garcia@empresa.com', edad: 24 };
console.log('Entrada:', entrada1);
console.log('Resultado:', validarUsuario(entrada1.nombre, entrada1.correo, entrada1.edad));

console.log('\n=== CASO DE PRUEBA 2: Datos inválidos ===');
const entrada2 = { nombre: '   ', correo: 'correo-invalido@', edad: 15 };
console.log('Entrada:', entrada2);
console.log('Resultado:', validarUsuario(entrada2.nombre, entrada2.correo, entrada2.edad));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validarUsuario };
}
