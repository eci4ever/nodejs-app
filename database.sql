-- Cipta database
CREATE DATABASE IF NOT EXISTS users;

-- Pilih database
USE users;

-- Cipta jadual
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);


