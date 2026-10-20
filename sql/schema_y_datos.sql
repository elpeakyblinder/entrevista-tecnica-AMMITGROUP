-- =====================================================================
-- CREACIÓN DE TABLAS Y DATOS DE PRUEBA (ABARROTES Y COMERCIO)
-- Motor: SQLite / PostgreSQL / MySQL Compatible
-- =====================================================================

DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;

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

-- Inserción de clientes
INSERT INTO clientes (nombre, correo, ciudad) VALUES
    ('Valeria Mendoza', 'valeria.mendoza@gmail.com', 'Querétaro'),
    ('Roberto Estrada', 'roberto.estrada@outlook.com', 'CDMX'),
    ('Sofía Cárdenas', 'sofi.cardenas@gmail.com', 'Querétaro'),
    ('Eduardo Morales', 'eduardo.m@hotmail.com', 'Guadalajara'),
    ('Beatriz Navarro', 'bety.navarro@yahoo.com', 'Monterrey'); -- Sin compras (para ejercicio 10)

-- Inserción de productos (Abarrotes y Miscelánea)
INSERT INTO productos (nombre, precio, stock) VALUES
    ('Costal de Azúcar 50kg', 1250, 6),
    ('Caja de Aceite Vegetal (12 pzas)', 580, 15),
    ('Bulto de Arroz Grano Largo 20kg', 460, 10),
    ('Café Soluble Frasco 300g', 185, 24),
    ('Detergente Multiusos 10kg', 340, 18),
    ('Caja de Galletas Surtidas', 220, 30),
    ('Leche Entera 1L (Cartón)', 28, 60),
    ('Atún en Agua 140g', 22, 80);

-- Inserción de ventas
INSERT INTO ventas (cliente_id, producto_id, cantidad, fecha) VALUES
    (1, 1, 2, '2026-03-01 09:15:00'),
    (1, 4, 3, '2026-03-02 11:40:00'),
    (2, 2, 1, '2026-03-03 15:20:00'),
    (3, 5, 2, '2026-03-04 17:10:00'),
    (4, 3, 1, '2026-03-05 10:05:00'),
    (2, 6, 2, '2026-03-06 18:30:00');
