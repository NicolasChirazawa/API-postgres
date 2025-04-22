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

function procurarRole (role_id, roles){
    for(let i = 0; i < roles.length; i++){
        if(role_id == roles[i]) { 
            return true; 
        } else if (roles[i] > role_id) {
            return false;
        }
    }
    return false;
}

module.exports = { Usuario, RequesicaoFracasso, procurarRole };