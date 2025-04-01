const express = require("express");
const app = express();
const port = process.env.PROJECT_PORT || '3000';

const options = {}

const pgp = require('pg-promise')();
const connectionString = `postgres://postgres:Carrinhos12@@localhost:5432/projeto-api`;
const db = pgp(connectionString);

db.connect()
  .then((obj) => {
    console.log('Connected to database');
    obj.done(); // success, release connection;
  })
  .catch((error) => {
    console.error('ERROR:', error.message);
  });

app.get('/api/users', async function (req, res) {
    
    let valor;
    try{
        valor = await db.any('SELECT * FROM users');
        res.send(valor);
    }
    catch (e) {
        console.log('Deu erro')
    }
})


app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
});