const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const dbPath = path.join(__dirname, 'tienda.db');

// Reiniciar base de datos limpia
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const db = new DatabaseSync(dbPath);

console.log('📦 Inicializando base de datos SQLite (Tienda / Abarrotes): tienda.db...\n');

// 1. Crear Tablas
db.exec(`
  CREATE TABLE clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    ciudad TEXT NOT NULL
  );

  CREATE TABLE productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL
  );

  CREATE TABLE ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
  );
`);

// 2. Insertar Datos de Prueba (Abarrotes y Miscelánea)
db.exec(`
  INSERT INTO clientes (nombre, correo, ciudad) VALUES
    ('Valeria Mendoza', 'valeria.mendoza@gmail.com', 'Querétaro'),
    ('Roberto Estrada', 'roberto.estrada@outlook.com', 'CDMX'),
    ('Sofía Cárdenas', 'sofi.cardenas@gmail.com', 'Querétaro'),
    ('Eduardo Morales', 'eduardo.m@hotmail.com', 'Guadalajara'),
    ('Beatriz Navarro', 'bety.navarro@yahoo.com', 'Monterrey'); -- Sin compras para reto de Ejercicio 10

  INSERT INTO productos (nombre, precio, stock) VALUES
    ('Costal de Azúcar 50kg', 1250, 6),
    ('Caja de Aceite Vegetal (12 pzas)', 580, 15),
    ('Bulto de Arroz Grano Largo 20kg', 460, 10),
    ('Café Soluble Frasco 300g', 185, 24),
    ('Detergente Multiusos 10kg', 340, 18),
    ('Caja de Galletas Surtidas', 220, 30),
    ('Leche Entera 1L (Cartón)', 28, 60),
    ('Atún en Agua 140g', 22, 80);

  INSERT INTO ventas (cliente_id, producto_id, cantidad, fecha) VALUES
    (1, 1, 2, '2026-03-01 09:15:00'),
    (1, 4, 3, '2026-03-02 11:40:00'),
    (2, 2, 1, '2026-03-03 15:20:00'),
    (3, 5, 2, '2026-03-04 17:10:00'),
    (4, 3, 1, '2026-03-05 10:05:00'),
    (2, 6, 2, '2026-03-06 18:30:00');
`);

console.log('✅ Tablas creadas y datos de abarrotes insertados con éxito.\n');

// 3. Ejecutar y mostrar las consultas de prueba técnica
console.log('================================================================');
console.log('EJERCICIO 6: Clientes de Querétaro');
console.log('================================================================');
const ej6 = db.prepare(`
  SELECT nombre, correo 
  FROM clientes 
  WHERE ciudad = 'Querétaro';
`).all();
console.table(ej6);

console.log('================================================================');
console.log('EJERCICIO 7: Top 5 productos más caros');
console.log('================================================================');
const ej7 = db.prepare(`
  SELECT nombre, precio, stock 
  FROM productos 
  ORDER BY precio DESC 
  LIMIT 5;
`).all();
console.table(ej7);

console.log('================================================================');
console.log('EJERCICIO 8: Inserción de "Webcam" (Requerido en examen) y actualización');
console.log('================================================================');
db.prepare(`INSERT INTO productos (nombre, precio, stock) VALUES ('Webcam', 899, 12);`).run();
console.log('-> Insertada Webcam con precio 899 y stock 12.');
const nuevoProd = db.prepare(`SELECT * FROM productos WHERE nombre = 'Webcam';`).get();
console.log('Producto insertado con ID:', nuevoProd.id);

db.prepare(`UPDATE productos SET stock = 10 WHERE id = ?;`).run(nuevoProd.id);
console.log('-> Stock actualizado a 10 usando su ID.');
console.table([db.prepare(`SELECT * FROM productos WHERE id = ?;`).get(nuevoProd.id)]);

console.log('================================================================');
console.log('EJERCICIO 9: JOIN de Ventas');
console.log('================================================================');
const ej9 = db.prepare(`
  SELECT 
    v.id AS venta_id,
    v.fecha,
    c.nombre AS cliente,
    p.nombre AS producto,
    v.cantidad
  FROM ventas v
  INNER JOIN clientes c ON v.cliente_id = c.id
  INNER JOIN productos p ON v.producto_id = p.id
  ORDER BY v.fecha DESC;
`).all();
console.table(ej9);

console.log('================================================================');
console.log('EJERCICIO 10: Importe total por cliente (con Reto: incluye clientes con 0)');
console.log('================================================================');
const ej10 = db.prepare(`
  SELECT 
    c.id AS cliente_id,
    c.nombre AS cliente,
    COALESCE(SUM(v.cantidad * p.precio), 0) AS total_compras
  FROM clientes c
  LEFT JOIN ventas v ON c.id = v.cliente_id
  LEFT JOIN productos p ON v.producto_id = p.id
  GROUP BY c.id, c.nombre
  ORDER BY total_compras DESC;
`).all();
console.table(ej10);

console.log('🎉 ¡Todos los ejercicios ejecutaron a la perfección!');
db.close();
