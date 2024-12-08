import express from 'express';
import { pgPool } from './pg_connection.js';
import { getMovies, getMovieUsers } from './db_queries.js';

let app = express();

const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log('The server is running');
});

app.get('/movies', async (req,res) => {
    let keyword = req.query.keyword;
    try {
        res.json(await getMovies(keyword));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

 app.get('/movie_users', async (req,res) => {
    try {
        res.json(await getMovieUsers());
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

 app.post('/movie', async (req,res) => {
    const id = req.body.mid;
    const name = req.body.mname;
    const year = req.body.myear;
    const genre = req.body.genre_id;

    try {
        const result = await pgPool.query(
            'INSERT INTO movie VALUES ($1,$2,$3,$4)', [id, name, year, genre]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});