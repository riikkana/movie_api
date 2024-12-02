import { pgPool } from './pg_connection.js';

try {
    const result = await pgPool.query("SELECT first_name fn FROM student");
    console.log(result.rows);
    
} catch(e){
    console.log(e.message);
}