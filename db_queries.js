import { pgPool } from "./pg_connection.js";

const SQL = {
    GET_ALL_MOVIES: 'SELECT * FROM movie LIMIT $1 OFFSET $2',
    GET_MOVIES: 'SELECT * FROM movie WHERE name LIKE $1 LIMIT $2 OFFSET $3',
    GET_MOVIES_BY_ID: 'SELECT * FROM movie WHERE id=$1',
    GET_MOVIE_USERS: 'SELECT * FROM movie_user',
    DELETE_MOVIE_BY_ID: 'DELETE FROM movie WHERE id=$1',
    ADD_REVIEW: 'INSERT INTO review (stars, review_text, movie_id, username) VALUES ($1,$2,$3,$4);',
    ADD_FAVOURITE: 'INSERT INTO favourite (username, movie_id) VALUES ($1, $2)',
    GET_FAVOURITES_BY_USER: 'SELECT favourite.username uname, movie.name FROM favourite JOIN movie ON favourite.movie_id=movie.id WHERE favourite.username=$1',
    //ADD_MOVIES: 'INSERT INTO movie VALUES ($1,$2,$3,$4)'
}

async function getMovies(keyword, page, pageSize) {
    try {
        let result;
        const offset = (page - 1) * pageSize;

        if(!keyword) {
            result = await pgPool.query(SQL.GET_ALL_MOVIES, [pageSize, offset]);
        } else {
            keyword =  '%'+keyword+'%';
            result = await pgPool.query(SQL.GET_MOVIES, [keyword, pageSize, offset]);
        }
        return {
            data: result.rows,
            page: page,
            page_size: pageSize,
            total_items: result.rowCount,
        };
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

async function deleteMovieById(id) {
    try {
        const result = await pgPool.query(SQL.DELETE_MOVIE_BY_ID, [id]);
        if (result.rowCount === 0) {
            throw new Error('Movie not found');
        }
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function addReview(stars, reviewText, movieId, username) {
    try {
        const result = await pgPool.query(SQL.ADD_REVIEW, [stars, reviewText, movieId, username]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

async function addFavourite(username, movieId) {
    try {
        const result = await pgPool.query(SQL.ADD_FAVOURITE, [username, movieId]);
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

async function getFavouritesByUser(user) {
    try {
        const result = await pgPool.query(SQL.GET_FAVOURITES_BY_USER, [user]);
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

export {getMovies, getMovieUsers, getMoviesById, deleteMovieById, addReview, addFavourite, getFavouritesByUser};
