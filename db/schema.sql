DROP DATABASE IF EXISTS sequelizedBurger_db;
CREATE DATABASE sequelizedBurger_db;
USE sequelizedBurger_db;

CREATE USER 'sequelizedBurger_db_user'@'localhost' IDENTIFIED BY 'toorregrub';
GRANT ALL ON sequelizedBurger_db.* TO 'burgers_db_user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE burgers (
	id INT NOT NULL AUTO_INCREMENT, 
	burger_name VARCHAR(40), 
	devoured BOOLEAN NOT NULL DEFAULT 0, 
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);
