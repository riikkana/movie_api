import express from 'express';
import { pgPool } from './pg_connection.js';
import { getMovies, getMoviesById, getMovieUsers, deleteMovieById, addReview, addFavourite, getFavouritesByUser } from './db_queries.js';
import bcrypt from 'bcrypt';
import { parse } from 'dotenv';

let app = express();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log('The server is running');
});

//1. add new genre
app.post('/genre', async (req,res) => {
    const id = req.body.id;
    const description = req.body.description;
    try {
        const result = await pgPool.query(
            'INSERT INTO genre VALUES ($1,$2)', [id, description]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//2. add new movie
app.post('/movie', async (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const year = req.body.year;
    const genre = req.body.genre;
    try {
        const result = await pgPool.query(
            'INSERT INTO movie VALUES ($1,$2,$3, $4)', [id, name, year, genre]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//3. add new user
app.post('/movie_user', async (req,res) => {
    const id = req.body.id;
    const uname = req.body.uname;
    const name = req.body.name;
    const pword = req.body.pword;
    const yob = req.body.yob;

    try {
        const hash = await bcrypt.hash(pword, 10);
        const result = await pgPool.query(
            'INSERT INTO movie_user VALUES ($1,$2,$3,$4,$5)', [id, uname, name, hash, yob]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//4. get movies by id
app.get('/movies_id', async (req,res) => {
    let id = req.query.id;
    try {
        res.json(await getMoviesById(id));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//5. remove movie by id
app.delete('/movies/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const deletedMovie = await deleteMovieById(id);

        res.json({ message: 'Movie deleted successfully', movie: deletedMovie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//6. ja 7. get movies; all and by keyword, with pagination
app.get('/movies', async (req,res) => {
    let keyword = req.query.keyword;
    let page = parseInt(req.query.page) || 1;
    let pageSize = 10;

    try {
        res.json(await getMovies(keyword, page, pageSize));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//8. add movie review
app.post('/reviews', async (req, res) => {
    const { stars, reviewText, movieId, username } = req.body;

    if (!stars || !movieId || !username) {
        return res.status(400).json({ error: 'Missing required fields: stars, movieId, username' });
    }
    if (stars < 1 || stars > 5) {
        return res.status(400).json({ error: 'Stars must be between 1 and 5' });
    }
    try {
        const newReview = await addReview(stars, reviewText, movieId, username);
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        if (error.constraint === 'review_movie_id_fkey') {
            return res.status(404).json({ error: 'Movie not found' });
        } else if (error.constraint === 'review_username_fkey') {
            return res.status(404).json({ error: 'User not found' });
        } else {
            console.error('Error adding review:', error); 
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
});


//9. add favourite movie for user
app.post('/favourites', async (req, res) => {
    const { username, movieId } = req.body;

    if (!username || !movieId) {
        return res.status(400).json({ error: 'Missing required fields: username, movieId' });
    }
    try {
        const newFavourite = await addFavourite(username, movieId);
        res.status(201).json({ message: 'Favourite added successfully', favourite: newFavourite });
    } catch (error) {
        if (error.code === '23503') {
            res.status(400).json({ error: 'Invalid username or movie ID' });
        } else if (error.code === '23505') {
            res.status(400).json({ error: 'This favourite already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

//10. get favourite movies by username
app.get('/favourites', async (req,res) => {
    let user = req.query.username;
    try {
        res.json(await getFavouritesByUser(user));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});


//get all users, ei ollut tehtävänannossa
 app.get('/movie_users', async (req,res) => {
    try {
        res.json(await getMovieUsers());
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

