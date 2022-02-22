CREATE DATABASE epytodo;

use epytodo;

CREATE TABLE user
(
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    CONSTRAINT id PRIMARY KEY (id)
);

CREATE TABLE todo
(
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description text NOT NULL,
    create_at DATETIME NOT NULL DEFAULT NOW(),
    due_time DATETIME NOT NULL,
    status VARCHAR(255) NOT NULL,
    user_id BIGINT unsigned NOT NULL,
    CONSTRAINT t_id PRIMARY KEY (id)
);