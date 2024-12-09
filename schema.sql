INSERT INTO genre (id, description) VALUES 
(1, 'drama'),(2, 'comedy'),(3, 'scifi'),(4, 'fantasy'),(5, 'action'),(6, 'triller');

INSERT INTO movie (name, year, genre_id) VALUES 
('Inception', 2010, 5),
('The Terminator', 1984, 5),
('Tropic Thunder', 2008, 2),
('Borat', 2006, 2),
('Interstellar', 2014, 1),
('Joker', 2019, 1);

INSERT INTO movie_user (username, name, password, year_of_birth) VALUES
('riikkana', 'Riikka Naamanka', 'qwerty123', 1919),
('lizzy', 'Lisa Simpson', 'abcdef', 1991 ),
('boss', 'Ben Bossy', 'salasana', 1981 )
