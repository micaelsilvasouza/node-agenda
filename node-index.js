const express = require("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")

const exibirRegistroAgenda = require("./node/node-funcoes/selecionar")
const inserirRegistroAgenda = require("./node/node-funcoes/inserir")
const atualizarRegistroAgenda = require("./node/node-funcoes/atualizar")
const deletarRegistroAgenda = require("./node/node-funcoes/deletar")


//Configurando handlebars template engine
app.engine("handlebars", handlebars.engine({defaultLayout: "agenda"}))
app.set("view engine", "handlebars")

//Configurando body-parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Página do calendário
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

//Ações da agenda
app.post("/agenda", (req, res)=>{
    let body = req.body
    let id = body.id
    let data = body.data
    let horario = body.horario
    let descricao = body.descricao

    if ((horario == undefined || horario == "") && (descricao == undefined || descricao == "") &&( id == undefined || id == "") && (data != undefined && data != "")) {
        exibirRegistroAgenda(res, data)
    }

    if((horario != undefined && horario != "") && (descricao != undefined && descricao != "") && (data != undefined && data != "") && (id == undefined || id == "")){
        inserirRegistroAgenda(data, horario, descricao, ()=>{exibirRegistroAgenda(res, data)})
    }

    if((horario != undefined && horario != "") && (descricao != undefined && descricao != "") && (data != undefined && data != "") && (id != undefined && id != "")){
        atualizarRegistroAgenda(id, horario, descricao, ()=>{exibirRegistroAgenda(res, data)})
    }

    if((horario == undefined || horario == "") && (descricao == undefined || descricao == "") && (id != undefined && id != "") && (data != undefined && data != "")){
        deletarRegistroAgenda(id, ()=>exibirRegistroAgenda(res, data))
    }
})

//CSS da página calendário
app.get("/css-calendario", (req, res)=>{
    res.sendFile(__dirname + "/css/calendario.css")
})

//CSS da página agenda
app.get("/css-agenda", (req, res)=>{
    res.sendFile(__dirname + "/css/agenda.css")
})

//JS da página calendário
app.get("/js-calendario", (req, res)=>{
    res.sendFile(__dirname + "/js/calendario.js")
})

//JS da página agenda
app.get("/js-agenda", (req, res)=>{
    res.sendFile(__dirname + "/js/agenda.js")
})

app.listen(8081, ()=>{console.log("Servidor Rodando")})