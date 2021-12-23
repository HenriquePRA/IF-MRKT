// Conexão com o banco de dados

const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
    user:process.env.PG_USER,
    host:process.env.PG_HOST,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE,
    port:process.env.PG_PORT,
    client_encoding:"UTF8",
}

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = {
    query: (text, params) => pool.query(text, params)
};