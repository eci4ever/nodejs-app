-- Cipta database
CREATE DATABASE IF NOT EXISTS eci_sys;

-- Pilih database
USE eci_sys;

-- Drop table jika wujud
DROP TABLE IF EXISTS users;

-- Cipta jadual
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
    date_updated TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);


