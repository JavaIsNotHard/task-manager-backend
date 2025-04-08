import postgres from 'pg';
import 'dotenv/config'

const { Pool } = postgres;

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export default {
    query: (text, params) => pool.query(text, params)
};