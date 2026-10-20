-- Evaluación técnica · SQL
-- Motor elegido: PostgreSQL (Sintaxis estándar ANSI, compatible con MySQL y SQLite)

/*
Estructura supuesta:
clientes: id (PK), nombre, correo, ciudad
productos: id (PK), nombre, precio, stock
ventas: id (PK), cliente_id (FK), producto_id (FK), cantidad, fecha
*/

-- ---------------------------------------------------------------------
-- 6. Consulta y filtros
-- Obtén nombre y correo de los clientes cuya ciudad sea “Querétaro”.
-- ---------------------------------------------------------------------
SELECT 
    nombre, 
    correo
FROM clientes
WHERE ciudad = 'Querétaro';


-- ---------------------------------------------------------------------
-- 7. Ordenamiento
-- Muestra los cinco productos más caros, incluyendo nombre, precio y stock.
-- ---------------------------------------------------------------------
SELECT 
    nombre, 
    precio, 
    stock
FROM productos
ORDER BY precio DESC
LIMIT 5;


-- ---------------------------------------------------------------------
-- 8. Inserción y actualización
-- Inserta un producto llamado “Webcam”, precio 899 y stock 12.
-- Después actualiza su stock a 10 usando su id.
-- ---------------------------------------------------------------------
INSERT INTO productos (nombre, precio, stock)
VALUES ('Webcam', 899, 12);

UPDATE productos
SET stock = 10
WHERE id = 9;


-- ---------------------------------------------------------------------
-- 9. JOIN entre tablas
-- Muestra por cada venta: id de venta, fecha, nombre del cliente,
-- nombre del producto y cantidad.
-- ---------------------------------------------------------------------
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


-- ---------------------------------------------------------------------
-- 10. Agrupación y suma
-- Obtén por cliente el importe total de sus compras (cantidad * precio),
-- ordenado de mayor a menor. Incluye clientes sin compras con total 0 como reto opcional.
-- ---------------------------------------------------------------------
SELECT 
    c.id AS cliente_id,
    c.nombre AS cliente,
    COALESCE(SUM(v.cantidad * p.precio), 0) AS total_compras
FROM clientes c
LEFT JOIN ventas v ON c.id = v.cliente_id
LEFT JOIN productos p ON v.producto_id = p.id
GROUP BY c.id, c.nombre
ORDER BY total_compras DESC;
