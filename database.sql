-- Cipta database
CREATE DATABASE IF NOT EXISTS eci_sys;

-- Pilih database
USE eci_sys;

-- Cipta jadual
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


