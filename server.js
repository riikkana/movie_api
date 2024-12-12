import express from 'express';
import { pgPool } from './pg_connection.js';
import { getMovies, getMoviesById, getMovieUsers } from './db_queries.js';

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
        const result = await pgPool.query(
            'INSERT INTO movie_user VALUES ($1,$2,$3,$4,$5)', [id, uname, name, pword, yob]);
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

//5. REMOVE MOVIE BY ID PUUTTUU VIELÄ

//6. ja 7. get movies; all and by keyword
app.get('/movies', async (req,res) => {
    let keyword = req.query.keyword;
    try {
        res.json(await getMovies(keyword));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//8. ADD MOVIE REVIEW PUUTTUU VIELÄ
//9. ADD FAVORITE MOVIE FOR USER PUUTTUU VIELÄ
//10. GET FAVORITE MOVIES BY USERNAME PUUTTUU VIELÄ


//get all users, ei ollut tehtävänannossa
 app.get('/movie_users', async (req,res) => {
    try {
        res.json(await getMovieUsers());
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

