const options = {}

const pg = require('pg-promise')(options);
const connection = {
    user: process.env.POSTGRE_USER,
    host: process.env.POSTGRE_HOST,
    database: process.env.POSTGRE_DATABASE,
    password: process.env.POSTGRE_PASSWORD,
    port: process.env.POSTGRE_PORT
}
const db = pg(connection);

module.exports = db;