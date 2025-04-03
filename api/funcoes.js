async function testarConexao(banco){
    let conexao;
    
    try{
      conexao = await banco.connect();
      console.log('Conectado a base de dados');
      conexao.done();
    } catch(e) {
      console.log('ERROR: ', e.message)
    }
}

function enviarErro(res, requisicaoProblema){
  res.status(requisicaoProblema.statusCode);
  res.send(requisicaoProblema);
}

module.exports = { testarConexao, enviarErro };