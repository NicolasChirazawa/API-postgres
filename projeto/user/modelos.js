class Usuario {
    constructor(id, nome, endereco, senha) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.senha = senha;
    }
}

class RequesicaoFracasso {
    constructor(statusCode, mensagem){
        this.status = 'Erro';
        this.statusCode = statusCode;
        this.mensagem = mensagem;
    }
}

module.exports = { Usuario, RequesicaoFracasso };