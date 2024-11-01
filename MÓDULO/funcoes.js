/**********************************************************************
 * Objetivo: Criar todas as funções em um arquivo a parte para que no futuro possamos integrar em uma API
 * Autor: Gabriel Souza Costa
 * Data: 18/10/2024
 * Versão: 1.0
 **********************************************************************/

var listaDeEstados = require('./estados_cidades')
var lista = listaDeEstados.listaDeEstados.estados

//******************** FUNÇÃO 1 *********************
const getListaDeEstados = function() {
    let retornoDoObjeto = {uf: [], quantidade: 0}
    let quantidade = 0

    lista.forEach(function(item){
        retornoDoObjeto.uf.push(item.sigla)
        quantidade++
    })
    retornoDoObjeto.quantidade = quantidade
    
    return retornoDoObjeto
}

//******************** FUNÇÃO 2 *********************
const getDadosEstado = function(siglaEstado) {
    let sigla = siglaEstado
    let retornoDeInformacoes = {uf: sigla, descricao: '', capital: '', regiao: ''}
    let objeto = lista.find(objeto => objeto.sigla === sigla)

    if (!objeto) {
        return false
    }

    retornoDeInformacoes.descricao = objeto.nome
    retornoDeInformacoes.capital = objeto.capital
    retornoDeInformacoes.regiao = objeto.regiao

    return  retornoDeInformacoes
}

//******************** FUNÇÃO 3 *********************
const getCapitalEstado = function(siglaEstado) {
    let sigla = siglaEstado
    let retornoDoObjeto = {uf: sigla, descricao: '', capital: ''}
    let objeto = lista.find(objeto => objeto.sigla === sigla)

    if (!objeto) {
        return false
    }

    retornoDoObjeto.descricao = objeto.nome
    retornoDoObjeto.capital = objeto.capital

    return  retornoDoObjeto

}

//******************** FUNÇÃO 4 *********************
const getEstadosRegiao  = function(regiaoEstado) {
    let regiao = regiaoEstado
    let retornoDoObjeto = {uf: regiao, estados: []}

    lista.forEach(function(item){
        if(item.regiao == regiao){
            let estado = {uf: item.sigla, descricao: item.nome}
            retornoDoObjeto.estados.push(estado)
        }
    })

    if (retornoDoObjeto.estados.length === 0){
        return false
    }

    return retornoDoObjeto
}

//******************** FUNÇÃO 5 *********************
const getCapitalPais = function(){
    let retornoDoObjeto = {capitais: []}

    lista.forEach(function(item){
        if(item.capital_pais){
            let objeto = 
            {
                capital_atual: item.capital,
                uf: item.sigla,
                descricao: item.nome,
                capital: item.capital,
                regiao: item.regiao,
                capital_pais_ano_inicio: item.capital_pais.ano_inicio,
                capital_pais_ano_fim: item.capital_pais.ano_fim
            }
            retornoDoObjeto.capitais.push(objeto)
        }
    })
    return retornoDoObjeto
}

//******************** FUNÇÃO 6 *********************
const getCidades =  function(siglaEstado){
    let sigla = siglaEstado
    let retornoDoObjeto = {uf: sigla, descricao: '', quantidade_de_cidades: 0, cidades: []}
    let quantidade = 0

    lista.forEach(function(item){
        if(item.sigla == sigla){
            retornoDoObjeto.descricao = item.nome
            item.cidades.forEach(function(CidadeItem){
                retornoDoObjeto.cidades.push(CidadeItem.nome)
                quantidade++
            })
        }
    })

    retornoDoObjeto.quantidade_de_cidades = quantidade

    if (!retornoDoObjeto || retornoDoObjeto.quantidade_de_cidades === 0) {
        return false
    }
    
    return retornoDoObjeto
}

//console.log(getListaDeEstados())

//console.log(getDadosEstado('SP'))

//console.log(getCapitalEstado('AC'))

//console.log(getEstadosRegiao('Sul'))

//console.log(getCapitalPais())

//console.log(getCidades('AC'))
