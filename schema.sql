-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS dateapp;
-- Creates the "blogger" database --
CREATE DATABASE dateapp;


CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	password  default false,
	email VARCHAR(255) not NULL,
    
    PRIMARY KEY (id)
);
