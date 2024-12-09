import { pgPool } from "./pg_connection.js";

const SQL = {
    GET_ALL_EMPLOYEES: 'SELECT * FROM movie',
    GET_EMPLOYEES: 'SELECT * FROM movie WHERE name LIKE $1',
    GET_MOVIE_USERS: 'SELECT * FROM movie_user'
}

async function getMovies(keyword) {
    try {
        let result;
        if(!keyword) {
            result = await pgPool.query(SQL.GET_ALL_EMPLOYEES);
        } else {
            keyword =  '%'+keyword+'%';
            result = await pgPool.query(SQL.GET_EMPLOYEES, [keyword]);
        }
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
export {getMovies, getMovieUsers};
