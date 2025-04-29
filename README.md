<div align=center>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=fffdaf&message=Javascript&color=grey&style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=d1ffbd&message=Node.JS&color=grey&style=for-the-badge&logo=node.js&logoColor=black"/>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=white&message=Express.JS&color=grey&style=for-the-badge&logo=express&logoColor=black"/>
  <img src="https://img.shields.io/static/v1?label=%20&labelColor=9fb6fd&message=Postgres&color=grey&style=for-the-badge&logo=postgreSQL&logoColor=black"/>
</div> <br>

<div align="center">
 • <a href=#descricao>Descrição</a> • <a href=#inicializar>Inicializar</a> • <a href=#endpoint>Endpoint</a> • <a href=#bd>Banco de Dados</a> • <a href=#lista_ideais>Lista de Ideias</a> •
</div>

<h2 name="descricao">💻 Descrição</h2>
Um estudo para o desenvolvimento de um CRUD com uma API Rest em Node.JS.

<h3>Funcionalidades</h3>
• As senhas são hasheado antes de serem mandadas ao banco de dados; <br>
• Utiliza-se do JWT para autenticação e autorização, como também para o compartilhamendo de informações ao cliente de forma segura; <br>
• O desenvolvimento de um sistema de 'roles' para o acesso dos endpoints que serão apontados na próxima seção; <br>

<h2 name="inicializar">🚀 Iniciando</h2>
Passos para utilizar deste projeto: <br>

<div align="center"><h6>/ Instalações dos Softwares / Baixar o projeto / Configurar as variáveis de ambiente / Inicializar o projeto /</h6></div>


<h3>Softwares necessários</h3>

• <a href="https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi">Node.JS</a>; <br>
• <a href="https://code.visualstudio.com/Download">Editor de Código</a> (recomendo VSC); <br>
• <a href="https://code.visualstudio.com/Download">PostgreSQL</a>; <br>
<h6>Recomendação: Um API Cliente para manejar as requisições, como o: <a href="https://dl.pstmn.io/download/latest/win64">Postman</a> 
  ou o <a href="https://updates.insomnia.rest/downloads/windows/latest?app=com.insomnia.app">Insomnia</a>; </h6>

<h3>Meios de acessar o projeto</h3>

<a href=https://github.com/NicolasChirazawa/projeto-yahoo-financas.git>Clone</a> o projeto ou <a href="https://github.com/NicolasChirazawa/projeto-yahoo-financas/archive/refs/heads/main.zip">baixe-o</a>; <br>

```
gh repo clone NicolasChirazawa/API-postgres
```

<h3>Definindo as variáveis de ambientes...</h3>

Use o arquivo <b>'.env-teste'</b> de referência para criar o seu próprio <b>'.env'</b>, 
e defina as seguintes variáveis de acordo a descrição.
```
PROJECT_PORT= /* Porta do Projeto */

POSTGRE_USER= /* Configurações do Banco */
POSTGRE_HOST= /* Configurações do Banco */
POSTGRE_DATABASE= /* Configurações do Banco */
POSTGRE_PASSWORD= /* Configurações do Banco */
POSTGRE_PORT= /* Configurações do Banco */

TOKEN-SECRET= /* Segredo do JWT */
```

<h3>Como inicializar o projeto?</h3>

Na raiz do projeto basta starttar.

```
npm start
```
<h2 name="endpoint">📍 Endpoints API</h2>

| rotas            | descrição                                  |
| ---------------- | :---:                                      |
| `POST/register`  | Registra um usuário no sistema.            |
| `POST/login`     | Entra no sistema.                          |
| `POST/users`     | Cria um usuário no banco.                  |
| `GET/users`      | Obtém todos os usuários registrados.       |
| `GET/users:id`   | Obtém um usuário específico.               |
| `UPDATE/users:id`| Atualiza todos os atributos de um usuário. |
| `DELETE/users:id`| Delete um usuário do banco.                |
| `PATCH/users:id`  | Atualiza atributo(s) de um usuário.       |

<h3>POST/register</h3>

<h4>REQUEST</h4>

```JSON
{
  "name": "teste",
  "senha": "aA125@"
}
```

<h4>RESPONSE</h4>

```JSON
{
  "user_id": 242,
  "name": "teste",
  "senha": "uyg$#GHVF@$#Ç(*¨GFC¨$" // Todas as senhas são hasheadas pelo bcrypt
}
```



<h3>POST/login</h3>

<h4>REQUEST</h4>

```JSON
{
  "name": "teste",
  "senha": "aA125@"
}
```

<h4>RESPONSE</h4>

```JSON
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNywicm9sZXMiOltdLCJpYXQiOjE3NDU1NDcyNTYsImV4cCI6MTc0NTU1MDg1Nn0.lT2UGWq3EJpSUnAIYr-yDMbmRwc2vBUVOhUizMBbD8o"
}
```



<h3>POST/users</h3>
<h6>É necessário de token e 'role' para uso desse endpoint.</h6>

<h4>REQUEST</h4>

```JSON
{
  "name": "teste",
  "senha": "aA125@"
}
```

<h4>RESPONSE</h4>

```JSON
{
  "user_id": 242,
  "name": "teste",
  "senha": "uyg$#GHVF@$#Ç(*¨GFC¨$" // Todas as senhas são hasheadas pelo bcrypt
}
```




<h3>GET/users</h3>
<h6>É necessário de token e 'role' para uso desse endpoint.</h6>

<h4>RESPONSE</h4>

```JSON
{
  "user_id": 242,
  "name": "teste",
  "senha": "uyg$#GHVF@$#Ç(*¨GFC¨$"
},
 {
  "user_id": 243,
  "nome": "teste2",
  "senha": "$liuywerv768orud58ygf95e"
}...
```




<h3>GET/users:id</h3>
<h6>É necessário de token e 'role' para uso desse endpoint.</h6>

<h4>RESPONSE</h4>

```JSON
{
  "user_id": 242,
  "name": "teste",
  "senha": "uyg$#GHVF@$#Ç(*¨GFC¨$"
}
```




<h3>UPDATE/users:id</h3>
<h6>É necessário de token e 'role' para uso desse endpoint.</h6>

<h4>REQUEST</h4>

```JSON
{
  "name": "teste123",
  "senha": "aA125@"
}
```

<h4>RESPONSE</h4>

```JSON
{
  "user_id": 242,
  "name": "teste",
  "senha": "uyg$#GHVF@$#Ç(*¨GFC¨$"
}
```




<h3>DELETE/users:id</h3>
<h6>É necessário de token e 'role' para uso desse endpoint.</h6>





<h3>PATCH/users:id</h3>
<h6>É necessário de token e 'role' para uso desse endpoint.</h6>

<h4>REQUEST</h4>

```JSON
{
  "senha": "aA1252ERF@"
}
```

<h2 name="bd">🧱 Banco de dados</h2>
<img src="https://raw.githubusercontent.com/NicolasChirazawa/API-postgres/refs/heads/main/read_me_images/Modelo-banco.png"/>

<h2 name="lista_ideais">📋 Lista de ideias</h2>
• Criação do Swagger para documentação da API; <br>
• Desenvolvimento de testes unitários; <br>
