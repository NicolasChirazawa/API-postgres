// Settando express
const express = require("express");
const app = express();
const port = process.env.PROJECT_PORT || '3000';
app.use(express.json());

// Settando banco
const db = require('./bd.js');

const testarConexao = require('./funcoes.js').testarConexao;
testarConexao(db);

const requisicaoFracasso = require('./estruturas.js').RequesicaoFracasso;

// Falta fazer o teste se já existe
// Arrumar o db.none
app.post('/api/users', async function (req, res) {
    const { nome, senha } = req.body;

    if(nome == undefined || senha == undefined) { 
        const reqMalSucedido = new requisicaoFracasso(400, 'Insira um nome e senha');
        return res.status(400).send(reqMalSucedido);
    }

    let erro_user = [];
    if(nome.lenght < 5) {
        erro_user.push("É necessário que o nome tenha pelo menos cinco caracteres");
    }

    let erro_senha = [];
    if(senha.search(/[A-Z]/) < 0) {
        erro_password.push("É necessário uma letra maiúscula");
    }
    if(senha.search(/[a-z]/) < 0) {
        erro_password.push("É necessário uma letra minúscula");
    }
    if(senha.search(/[!@#$%¨&*]/) < 0) {
        erro_password.push("É necessário ter um símbolo especial");
    }
    if(senha.lenght > 5){
        erro_password.push("É necessário ter pelo menos 5 caracteres");
    }

    if(erro_user.length > 0 || erro_senha.length > 0) {
        const mensagens = { usuario: erro_user, senha: erro_senha }; 
        const reqMalSucedido = new requisicaoFracasso(400, mensagens);
        return res.status(400).send(reqMalSucedido);
    }

    let dados_request;
    try{
        dados_request = await db.none({
            text: 'INSERT INTO users (nome, senha) VALUES ($1, $2)',
            values: [nome, senha]
        })
    } catch {
        const reqMalSucedido = new requisicaoFracasso(400, "Não foi possível criar o usuário");
        return res.status(400).send(reqMalSucedido);
    }

    res.status(201).send(dados_request);
});

app.get('/api/users', async function (req, res) {
    
    let dados_request;

    try{
        dados_request = await db.many('SELECT * FROM users');
    }
    catch (e) {
        const reqMalSucedido = new requisicaoFracasso(400, `Ocorreu um erro durante a requisição: ${e.message}`);
        return res.status(400).send(reqMalSucedido);
    }

    return res.send(dados_request);
});

app.get('/api/users/:id', async function (req, res) {

    const user_id = Number(req.params.id);

    // Será um middleware de verificação
    /* Mesma coisa que 'Boolean(user_id) == false' */
    if(!user_id) { 
        let reqMalSucedido = new requisicaoFracasso(400, 'ID inválido');
        return res.status(400).send(reqMalSucedido);
    }

    let dados_request;
    try {
        dados_request = await db.one({
            text: 'SELECT * FROM users WHERE user_id = $1', 
            values: [user_id]
        })
    } catch {
        reqMalSucedido = new requisicaoFracasso(404, 'ID não existe.');
        return res.status(404).send(reqMalSucedido);
    }

    return res.status(200).send(dados_request);
});

app.put('/api/users/:id', async function (req, res) {
    const user_id = Number(req.params.id);
    const { nome, senha } = req.body;

    if(!user_id) {
        const reqMalSucedido = new requisicaoFracasso(400, 'ID não é válido');
        return res.status(400).send(reqMalSucedido);
    }

    if(nome == undefined || senha == undefined) { 
        const reqMalSucedido = new requisicaoFracasso(400, 'Insira um nome e senha');
        return res.status(400).send(reqMalSucedido);
    }

    let erro_user = [];
    if(nome.search(/[A-Z]/) < 0) {
        erro_user.push("É necessário uma letra maiúscula");
    }
    if(nome.search(/[a-z]/) < 0) {
        erro_user.push("É necessário uma letra minúscula");
    }

    let erro_password = [];
    if(senha.search(/[A-Z]/) < 0) {
        erro_password.push("É necessário uma letra maiúscula");
    }
    if(senha.search(/[a-z]/) < 0) {
        erro_password.push("É necessário uma letra minúscula");
    }
    if(senha.search(/[!@#$%¨&*]/) < 0) {
        erro_password.push("É necessário ter um símbolo especial");
    }
    if(senha.lenght > 5){
        erro_password.push("É necessário ter pelo menos 5 caracteres");
    }

    if(erro_user.length > 0 || erro_password.length > 0) {
        const mensagens = { usuario: erro_user, senha: erro_password }; 
        const reqMalSucedido = new requisicaoFracasso(400, mensagens);
        return res.status(400).send(reqMalSucedido);
    }

    let dados_request;
    try{
        dados_request = await db.none({
            text: 'UPDATE users SET nome = $1, senha = $2 WHERE user_id = $3',
            values: [nome, senha, user_id]
        })
    } catch {
        const reqMalSucedido = new requisicaoFracasso(404, "Não foi encontrado o ID do usuário");
        return res.status(404).send(reqMalSucedido);
    }

    res.status(204).send(dados_request);
});

app.delete('/api/users/:id', async function (req, res) {

    const user_id = Number(req.params.id);

    if(!user_id){
        const reqMalSucedido = new requisicaoFracasso(400, 'Insira um ID válido');
        return res.status(400).send(reqMalSucedido);
    }

    let dados_request;
    try {
        dados_request = await db.none({
            text: 'DELETE FROM users WHERE user_id = $1', 
            values: [user_id]
        });
    } catch {
        const reqMalSucedido = new requisicaoFracasso(404, 'ID não existe.');
        return res.status(404).send(reqMalSucedido);
    }

    return res.status(204).send(dados_request);
})

app.patch('/api/users/:id', async function (req, res) {
    
    const user_id = Number(req.params.id);

    if(!user_id){
        const reqMalSucedido = new requisicaoFracasso(400, 'Insira um ID de usuário válido');
        return res.status(400).send(reqMalSucedido);
    }

    const { nome, senha } = req.body;

    let erro_user = [];
    let erro_password = [];
    let textos_parametros = [];
    let valores_parametros = [];

    if(nome != undefined && nome != '') {
        if(nome.lenght < 5) {
            erro_user.push("É necessário que o nome tenha pelo menos cinco caracteres");
        }

        if(erro_user.length == 0) {
            textos_parametros.push(`nome = $${textos_parametros.lenght + 1}`);
            valores_parametros.push(nome);
        }
    }

    if(senha != undefined && senha != '') {
        if(senha.search(/[A-Z]/) < 0) {
            erro_password.push("É necessário uma letra maiúscula");
        }
        if(senha.search(/[a-z]/) < 0) {
            erro_password.push("É necessário uma letra minúscula");
        }
        if(senha.search(/[!@#$%¨&*]/) < 0) {
            erro_password.push("É necessário ter um símbolo especial");
        }
        if(senha.lenght > 5){
            erro_password.push("É necessário ter pelo menos 5 caracteres");
        }

        if(erro_password.length == 0) {
            textos_parametros.push(`senha = $${textos_parametros.lenght + 1}`);
            valores_parametros.push(senha);
        }
    }

    if(erro_user > 0 || erro_password > 0) {
        const mensagens = { usuario: erro_user, senha: erro_password }
        const reqMalSucedido = new requisicaoFracasso(400, mensagens);
        return res.status(400).send(reqMalSucedido);
    }

    if(valores_parametros.lenght <= 0) {
        const reqMalSucedido = new requisicaoFracasso(400, 'Não há parâmetros para atualizar');
        return res.send(400).send(reqMalSucedido);
    }

    const parametros = textos_parametros.join(', ');
    valores_parametros.push(user_id);

    let dados_request;
    try {
        dados_request = await db.one ({
            text: `UPDATE users SET ${parametros} WHERE user_id = $${textos_parametros.length + 1}`,
            values: [valores_parametros]
        })
    } catch {
        const reqMalSucedido = new requisicaoFracasso(400, 'Erro durante a atualização');
        return res.send(reqMalSucedido);
    }

    res.status(201).send(dados_request);
});


app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
});