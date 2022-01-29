DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;


USE business_db;


CREATE TABLE departments (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(30) NOT NULL,
     PRIMARY KEY(id)
     
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE SET NULL
);




