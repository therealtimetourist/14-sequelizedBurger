DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE USER 'burgers_db_user'@'localhost' IDENTIFIED BY 'toorregrub';
GRANT ALL ON burgers_db.* TO 'burgers_db_user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE burgers (
	id INT NOT NULL AUTO_INCREMENT, 
	burger_name VARCHAR(40), 
	devoured BOOLEAN NOT NULL DEFAULT 0, 
	date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);
