-- Active: 1730711483210@@127.0.0.1@5432@postgres@public
CREATE TABLE genre (
    id INT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE movie_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    year_of_birth INT NOT NULL
);

CREATE TABLE favourite (
    username VARCHAR(50) NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (username, movie_id),
    FOREIGN KEY (username) REFERENCES movie_user(username),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);

CREATE TABLE keyword (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE keyword_movie (
    keyword_id INT NOT NULL,
    movie_id INT NOT NULL,
    PRIMARY KEY (keyword_id, movie_id),
    FOREIGN KEY (keyword_id) REFERENCES keyword(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);

CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    stars INT NOT NULL CHECK (stars BETWEEN 1 AND 5),
    review_text VARCHAR(255),
    movie_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movie(id),
    FOREIGN KEY (username) REFERENCES movie_user(username)
);