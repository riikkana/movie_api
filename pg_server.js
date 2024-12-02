import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let app = express();

const {Client} = pg;

app.listen(3001, () => {
    console.log('The server is running');
});

const client = new Client();

/* const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
}); */

connect();

async function connect() {

    try {
        await client.connect();
        await client.query("INSERT INTO student VALUES (DEFAULT, 'bart', 'simpson', '13', 'OAMK')")
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
    }
}