// Settando express
const express = require("express");
const app = express();
const port = process.env.PROJECT_PORT || '3000';

// Settando banco
const funcoes = require('./funcoes.js');
const db = require('./bd.js');

funcoes.testarConexao(db);

app.get('/api/users', async function (req, res) {
    
    try{
        let valor = await db.any('SELECT * FROM users');

        res.send(valor);
    }
    catch (e) {
        console.log('Deu erro:', e.message);
        res.status(400);
        res.send(e.message);
    }
})

app.get('/api/users/:id', async function (req, res) {
  
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