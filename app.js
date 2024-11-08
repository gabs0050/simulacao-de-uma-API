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

//Import do arquivo de funções
const estadosCidades = require('./MÓDULO/funcoes.js')

//EndPoint para retornar as siglas dos estados
app.get('/v1/estados-cidades/lista-estados/siglas', cors(), async function(request, response){

    //Chama a função que vai retornar a lista dos estados
    let dadosEstados = estadosCidades.getListaDeEstados()
    
    if(dadosEstados){
    response.status(200)
    response.json(dadosEstados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar nehum item de retorno'})
    }

})

//EndPoint para retornar as características de um estado filtrando pela sigla
app.get('/v1/estados-cidades/estado/:sigla', cors (), async function(request, response){
    //Recebe o parâmetro(variável) :sigla pera URL
    let uf = request.params.sigla

    //Chama a funçao para filtrar o estado
    let dados = estadosCidades.getDadosEstado(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Estado não localizado'})
    }
})

//EndPoint que retorna a descrição e a capital da cidade
app.get('/v1/estados-cidades/capital/estado', cors(), async function(request, response){
    let uf = request.query.sigla

    let dados = estadosCidades.getCapitalEstado(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Estado não localizado'})
    }
})

//EndPoint que retorna a lista de estados de uma região
app.get('/v1/estados-cidades/estados/regiao', cors(), async function(request, response){
    let uf = request.query.regiao

    let dados =  estadosCidades.getEstadosRegiao(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Estado não localizado'})
    }
})

//EndPoint que retorna as capitais do país, listando capital atual, uf, descrição, capital, região, capital pais ano inicio, e capital pais ano fim
app.get('/v1/estados-cidades/capitais/pais', cors(), async function(request, response){

    //Chama a função que vai retornar a lista dos estados
    let dadosEstados = estadosCidades.getCapitalPais()
    
    if(dadosEstados){
    response.status(200)
    response.json(dadosEstados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar nehum item de retorno'})
    }

})

//EndPoint que lista todas as cidades de um estado, mostrando a quantidade também
app.get('/v1/estados-cidades/estados/cidades', cors(), async function(request, response){
    let uf = request.query.sigla

    let dados = estadosCidades.getCidades(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Estado não localizado'})
    }
})


app.listen('8080', function (){
    console.log('API aguardando requisições ...')
})