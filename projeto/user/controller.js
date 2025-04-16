// Settando banco
const bd = require('../conexao.js');

const requisicaoFracasso = require('./modelos.js').RequesicaoFracasso;

const bcrypt = require('bcrypt');
const saltRound = 10;

const logUser = (async function (req, res) {
    const { nome, senha } = req.body;
    
    if(nome == undefined || nome == '' || senha == undefined || nome == '') {
        const reqMalSucedido = new requisicaoFracasso(400, 'Insira um nome e senha válida.')
        return res.status(400).send(reqMalSucedido);
    }

    let login_teste;
    try{
        login_teste = await bd.one ({
            text: 'SELECT senha FROM users WHERE nome = $1',
            values: [nome]
        });
    } catch {
        const reqMalSucedido = new requisicaoFracasso(404, 'Usuário e/ou senha incorreto(s).');
        return res.status(404).send(reqMalSucedido);
    }

    const senha_hash_teste = await bcrypt.compare(senha, login_teste.senha); 

    if(!senha_hash_teste) {
        const reqMalSucedido = new requisicaoFracasso(404, 'Usuário e/ou senha incorreto(s).');
        return res.status(404).send(reqMalSucedido);
    }

    return res.status(200).send();
});

// Falta fazer o teste se já existe user com aquele nome
const createUser = (async function (req, res) {
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
        erro_senha.push("É necessário uma letra maiúscula");
    }
    if(senha.search(/[a-z]/) < 0) {
        erro_senha.push("É necessário uma letra minúscula");
    }
    if(senha.search(/[!@#$%¨&*]/) < 0) {
        erro_senha.push("É necessário ter um símbolo especial");
    }
    if(senha.lenght > 5){
        erro_senha.push("É necessário ter pelo menos 5 caracteres");
    }

    if(erro_user.length > 0 || erro_senha.length > 0) {
        const mensagens = { usuario: erro_user, senha: erro_senha }; 
        const reqMalSucedido = new requisicaoFracasso(400, mensagens);
        return res.status(400).send(reqMalSucedido);
    }

    const senha_hash = await bcrypt.hash(senha, saltRound);

    let dados_request;
    try{
        dados_request = await bd.one({
            text: 'INSERT INTO users (nome, senha) VALUES ($1, $2) RETURNING user_id, nome, senha',
            values: [nome, senha_hash]
        })
    } catch {
        const reqMalSucedido = new requisicaoFracasso(400, "Não foi possível criar o usuário");
        return res.status(400).send(reqMalSucedido);
    }
    res.status(201).send(dados_request);
});

const getAllUsers = (async function (req, res) {
    
    let dados_request;

    try{
        dados_request = await bd.many('SELECT * FROM users');
    }
    catch (e) {
        const reqMalSucedido = new requisicaoFracasso(400, `Ocorreu um erro durante a requisição: ${e.message}`);
        return res.status(400).send(reqMalSucedido);
    }

    return res.send(dados_request);
});

const getUser = (async function (req, res) {

    const user_id = Number(req.params.id);

    // Será um middleware de verificação
    // Mesma coisa que 'Boolean(user_id) == false'
    if(!user_id) { 
        let reqMalSucedido = new requisicaoFracasso(400, 'ID inválido');
        return res.status(400).send(reqMalSucedido);
    }

    let dados_request;
    try {
        dados_request = await bd.one({
            text: 'SELECT * FROM users WHERE user_id = $1', 
            values: [user_id]
        })
    } catch {
        reqMalSucedido = new requisicaoFracasso(404, 'ID não existe.');
        return res.status(404).send(reqMalSucedido);
    }

    return res.status(200).send(dados_request);
});

const updateUser = (async function (req, res) {
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
    if(nome.lenght < 5) {
        erro_user.push("É necessário de pelo menos 5 letras");
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

    const senha_hash = await bcrypt.hash(senha, saltRound);

    let dados_request;
    try{
        dados_request = await bd.one({
            text: 'UPDATE users SET nome = $1, senha = $2 WHERE user_id = $3 RETURNING user_id, nome, senha',
            values: [nome, senha_hash, user_id]
        })
    } catch {
        const reqMalSucedido = new requisicaoFracasso(404, "Não foi encontrado o ID do usuário");
        return res.status(404).send(reqMalSucedido);
    }

    res.status(200).send(dados_request);
});

const deleteUser = (async function (req, res) {

    const user_id = Number(req.params.id);

    if(!user_id){
        const reqMalSucedido = new requisicaoFracasso(400, 'Insira um ID válido');
        return res.status(400).send(reqMalSucedido);
    }

    let dados_request;
    try {
        dados_request = await bd.none({
            text: 'DELETE FROM users WHERE user_id = $1', 
            values: [user_id]
        });
    } catch {
        const reqMalSucedido = new requisicaoFracasso(404, 'ID não existe.');
        return res.status(404).send(reqMalSucedido);
    }

    return res.status(204).send(dados_request);
});

const patchUser = (async function (req, res) {
    
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

        if(nome.length < 5) {
            erro_user.push("É necessário que o nome tenha pelo menos cinco caracteres");
        }

        if(erro_user.length == 0) {
            textos_parametros.push(`nome = $${textos_parametros.length + 1}`);
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
        if(senha.length < 5){
            erro_password.push("É necessário ter pelo menos 5 caracteres");
        }

        if(erro_password.length == 0) {
            textos_parametros.push(`senha = $${textos_parametros.length + 1}`);
            
            const senha_hash = await bcrypt.hash(senha, saltRound);

            valores_parametros.push(senha_hash);
        }
    }

    if(erro_user.length > 0 || erro_password.length > 0) {
        const mensagens = { usuario: erro_user, senha: erro_password }
        const reqMalSucedido = new requisicaoFracasso(400, mensagens);
        return res.status(400).send(reqMalSucedido);
    }

    if(valores_parametros.length == 0) {
        const reqMalSucedido = new requisicaoFracasso(400, 'Não há parâmetros para atualizar');
        return res.status(400).send(reqMalSucedido);
    }

    const parametros = textos_parametros.join(', ');
    valores_parametros.push(user_id);

    let dados_request;
    try {
        dados_request = await bd.none ({
            text: `UPDATE users SET ${parametros} WHERE user_id = $${textos_parametros.length + 1}`,
            values: valores_parametros
        })
    } catch (e) {
        console.log(e);

        const reqMalSucedido = new requisicaoFracasso(400, 'Erro durante a atualização');
        return res.status(400).send(reqMalSucedido);
    }

    res.status(204).send(dados_request);
});

module.exports = { logUser, createUser, getAllUsers, getUser, updateUser, deleteUser, patchUser }