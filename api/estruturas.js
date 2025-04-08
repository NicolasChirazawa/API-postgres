class Usuario {
    constructor(id, nome, endereco, senha) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.senha = senha;
    }
}

class RequesicaoSucesso {
    constructor(statusCode, message, dados){
        this.status = 'Sucesso';
        this.statusCode = statusCode;
        this.message = message;
        this.dados = dados;
    }
}

class RequesicaoFracasso {
    constructor(statusCode, mensagem){
        this.status = 'Erro';
        this.statusCode = statusCode;
        this.mensagem = mensagem;
    }
}

module.exports = { Usuario, RequesicaoSucesso, RequesicaoFracasso };