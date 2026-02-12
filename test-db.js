const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET');

const {Pool} = pg;

const pool = new Pool(
    {
        connectionString:process.env.DATABASE_URL,
    }
);

async function testConnection(){
    try{
        const client = await pool.connect();
        console.log("Connected to database");

        const result = await client.query('SELECT * FROM users');
        //prisma.task.findMany();

        client.release();
    } catch (err){
        console.error("Boo no DB", err);
    } finally {
        await pool.end();
    }
}

testConnection();