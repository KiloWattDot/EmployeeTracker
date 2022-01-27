DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;


CREATE TABLE department (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(30) 
)
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    
    department_id  INT DEFAULT 1 NOT NULL
);


