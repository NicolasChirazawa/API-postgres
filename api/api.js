// Settando express
const express = require("express");
const app = express();
const port = process.env.PROJECT_PORT || '3000';

// Settando banco
const testarConexao = require('./funcoes.js').testarConexao;
const enviarErro = require('./funcoes.js').enviarErro;

const db = require('./bd.js');

testarConexao(db);

// Preparando classes
const requestErro = require('./estruturas.js').RequestFracasso;

app.get('/api/users', async function (req, res) {
    
    try{
        let dados_request = await db.any('SELECT * FROM users');
        res.send(dados_request);
    }
    catch (e) {
        console.log('Deu erro:', e.message);
        res.status(400);
        res.send(e.message);
    }
})

app.get('/api/users/:id', async function (req, res) {

    const user_id = Number(req.params.id);

    // Será um middleware de verificação
    if(Boolean(id) == false) { 
        let requisicaoProblema = new requestErro(400, 'ID inválido');
        return enviarErro(res, requisicaoProblema);
    }

    let dados_request;
    try {
        dados_request = await db.one('SELECT * FROM users WHERE user_id = $1', [user_id])
    } catch {
        requisicaoProblema = new requestErro(400, 'ID não existe.');
        return enviarErro(res, requisicaoProblema);
    }

    return res.send(dados_request);
})

app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
});