import { pgPool } from "./pg_connection.js";

const SQL = {
    GET_ALL_MOVIES: 'SELECT * FROM movie',
    GET_MOVIES: 'SELECT * FROM movie WHERE name LIKE $1',
    GET_MOVIES_BY_ID: 'SELECT * FROM movie WHERE id=$1',
    GET_MOVIE_USERS: 'SELECT * FROM movie_user',
    //ADD_MOVIES: 'INSERT INTO movie VALUES ($1,$2,$3,$4)'
}

async function getMovies(keyword) {
    try {
        let result;
        if(!keyword) {
            result = await pgPool.query(SQL.GET_ALL_MOVIES);
        } else {
            keyword =  '%'+keyword+'%';
            result = await pgPool.query(SQL.GET_MOVIES, [keyword]);
        }
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getMoviesById(id) {
    try {
        const result = await pgPool.query(SQL.GET_MOVIES_BY_ID, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getMovieUsers() {
    try {
        const result = await pgPool.query(SQL.GET_MOVIE_USERS);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

/*async function addMovies(id, name, year, genre) {
    try {
        const result = await pgPool.query(SQL.ADD_MOVIES, [id, name, year, genre]);
        return result;
    } catch (error) {
        throw error;
    }
}*/

export {getMovies, getMovieUsers, getMoviesById};
