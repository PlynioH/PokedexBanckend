const express = require('express')
require('dotenv').config()
const InicializaMongoServer = require('./database/db')
const rotasPokemon = require('./routes/RotaPokemon')

InicializaMongoServer() 
const app = express()

app.use(express.json()) 

app.get("/",(req, res) => {
    res.json({
        mensagem: 'PokeAPI funcionando!',
        versao: '1.0.0'
    })

})

app.use("/RotaPokemon", rotasPokemon)


app.use(function(req, res){
    res.status(404).json({
        mensagem: `A PokeRota ${req.originalUrl} não existe!`
    })
})

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log(`PokeServidor rodando em ${process.env.PORT}`)
})
