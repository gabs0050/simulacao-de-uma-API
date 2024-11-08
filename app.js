/**********************************************************************
 * Objetivo: API para manipular dados de estados e cidades
 * Autor: Gabriel Souza Costa
 * Data: 01/11/2024
 * Versão: 1.0
 **********************************************************************/

/*
    Para criar uma API devemos instalar:
        - express       npm install express --save      -Serve para criar uma API
        - cors          npm install cors --save         -Serve para configurar as configurações da API
        - body-parser   npm install body-parser --save  -Serve para manipular os dados do body da API
*/

//Import das bibliotecas para criar uma API.
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Inicializando o express através do objeto app
const app = express()

//request   - Dados que  chegam na API
//response  - Dados que saem da API

app.use((request, response, next)=>{
    //Permissão de acesso para liberar quais computadores poderão acessar a API
    response.header('Acess-Control-Allow-Origin', '*')
    //Permissão de acesso para liberar os verbos da requisição da API
    response.header('Acess-Control-Allow-Methods', 'GET')
    
    app.use(cors()) //Ativando as configurações do cors

    next() //Serve  para passar para a próxima configuração, pois se nao tiver esse comando, ele para nesta configuração
})

//EndPoint para retornar as siglas dos estados
app.get('/v1/estados-cidades/lista-estados/siglas', cors(), async function(request, response){
    //Import do arquivo de funções
    let estadosCidades = require('./MÓDULO/funcoes.js')

    //Chama a função que vai retornar a lista dos estados
    let dadosEstados = estadosCidades.getListaDeEstados()
    
    response.status(200)
    response.json(dadosEstados)

})

app.listen('8080', function (){
    console.log('API aguardando requisições ...')
})