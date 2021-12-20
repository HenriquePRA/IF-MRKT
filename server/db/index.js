// Conexão com o banco de dados

const { Pool } = require("pg");

const configs = {
    user:"nomarowH74",
    host:"ifmarketplacehpoggi.ckt5rchhvjyc.sa-east-1.rds.amazonaws.com",
    password:"Nomekop$dataBase#170",
    database:"ifmarketplace",
    port:5432,
    client_encoding:"UTF8",
};

const pool = new Pool(configs);

module.exports = {
    query: (text, params) => pool.query(text, params)
};