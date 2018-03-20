-- DROP DATABASE IF EXISTS itinerary_db;
-- CREATE DATABASE itinerary_db;

CREATE DATABASE db;

USE db;

CREATE TABLE users (
id INT AUTO_INCREMENT NOT NULL,
username VARCHAR(50) NOT NULL,
password VARCHAR(60) NOT NULL,
primary key (id)
);