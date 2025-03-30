const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send("Olá, mundo!")
});

app.get('/users', (req, res) =>{
    res.send("Olá, mundo!")
});


app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
});