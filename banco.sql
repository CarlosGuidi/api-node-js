CREATE DATABASE produtos;
USE produtos;

CREATE TABLE produtos(
	id int not null primary key auto_increment,
	descricao varchar(150) not null,
	preco decimal(10, 2) not null,
	disponivel bit not null
);