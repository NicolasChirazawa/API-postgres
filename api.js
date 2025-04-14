// Settando express
const express = require("express");
const app = express();
const port = process.env.PROJECT_PORT || '3000';

// Importa o router do controller
const userRoutes = require('./user/router.js');

// Trata o body
app.use(express.json());

// Settando e testando o banco
const bd = require('./user/conexao.js');
const testarConexao = require('./user/funcoes.js').testarConexao;
testarConexao(bd);

// Os 'routes' de 
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
});