-- DROP DATABASE inter_2023;
CREATE DATABASE IF NOT EXISTS inter_2023;

USE inter_2023;

DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS basic_info;
DROP TABLE IF EXISTS general_info;
DROP TABLE IF EXISTS technical_info;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS films;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS people_films;

CREATE TABLE IF NOT EXISTS sections (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50),
    title VARCHAR(100) NOT NULL,
    short_desc VARCHAR(280) NOT NULL,
    bio VARCHAR(1000),
    cur_text VARCHAR(1000),    
    image VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS sessions (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	idSection INT UNSIGNED NOT NULL,
    FOREIGN KEY (idSection) REFERENCES sections (id),
	title VARCHAR(100) NOT NULL,
    date DATE,
    hour TIME,
    place VARCHAR(50),
    duration INT UNSIGNED NOT NULL,
    bio VARCHAR(1000),
    cur_text VARCHAR(1000),    
    image VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS basic_info (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    director VARCHAR(100),
    year INT UNSIGNED,
    duration INT UNSIGNED,
    sponsor VARCHAR(100),
    country VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS general_info (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    bio TEXT,
    credits TEXT,
    genre VARCHAR(100),
    title_original VARCHAR(100),
    translated_title VARCHAR(100),
    lang VARCHAR(50),
    subt_lang VARCHAR(50),
    film_type VARCHAR(50),
    premiere_type VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS technical_info (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    sound_format VARCHAR(100),
    color_bn VARCHAR(50),
    recording_format VARCHAR(100),
    exhibition_format VARCHAR(100),
    film_dimmension VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    writer VARCHAR(100),
    dir_photo VARCHAR(100),
    editor VARCHAR(100),
    sound VARCHAR(100),
    exec_prod VARCHAR(100),
    other VARCHAR(100),
    prod VARCHAR(100),
    prod_company VARCHAR(100),
    distr_company VARCHAR(100),
    participants VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS films (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    basic_info_id INT UNSIGNED,
    general_info_id INT UNSIGNED,
    technical_info_id INT UNSIGNED,
    team_id INT UNSIGNED,
    title VARCHAR(100) NOT NULL,
    short_desc VARCHAR(280) NOT NULL,
    image VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (basic_info_id) REFERENCES basic_info (id),
    FOREIGN KEY (general_info_id) REFERENCES general_info (id),
    FOREIGN KEY (technical_info_id) REFERENCES technical_info (id),
    FOREIGN KEY (team_id) REFERENCES team (id)
);


CREATE TABLE IF NOT EXISTS people (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  short_desc VARCHAR(280) NOT NULL,
  text VARCHAR(500),
  bio VARCHAR(500),
  type VARCHAR(50) NOT NULL,
  image VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS people_films (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  people_id INT UNSIGNED NOT NULL,
  films_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (people_id) REFERENCES people(id),
  FOREIGN KEY (films_id) REFERENCES films(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





