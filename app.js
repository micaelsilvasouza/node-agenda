const express = require("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")

const {showRecords} = require("./node/node-funcoes/select")
const {insertRecords} = require("./node/node-funcoes/insert")
const {updateRecords} = require("./node/node-funcoes/update")
const {deleteRecords}= require("./node/node-funcoes/delete")


//Configurando handlebars template engine
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//Configurando body-parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Configurando arquivos estaticos
app.use(express.static("public"))

//Página do calendário
app.get("/", (req, res)=>{
    res.render("calendar")
})

//Ações da agenda
app.post("/agenda", (req, res)=>{
    let body = req.body
    let id = body.id
    let data = body.data
    let horario = body.horario
    let descricao = body.descricao

    if ((horario == undefined || horario == "") && (descricao == undefined || descricao == "") &&( id == undefined || id == "") && (data != undefined && data != "")) {
        showRecords(res, data)
    }

    if((horario != undefined && horario != "") && (descricao != undefined && descricao != "") && (data != undefined && data != "") && (id == undefined || id == "")){
        insertRecords(data, horario, descricao, ()=>{showRecords(res, data)})
    }

    if((horario != undefined && horario != "") && (descricao != undefined && descricao != "") && (data != undefined && data != "") && (id != undefined && id != "")){
        updateRecords(id, horario, descricao, ()=>{showRecords(res, data)})
    }

    if((horario == undefined || horario == "") && (descricao == undefined || descricao == "") && (id != undefined && id != "") && (data != undefined && data != "")){
        deleteRecords(id, ()=>showRecords(res, data))
    }
})


const PORT = 8081
app.listen(PORT, ()=>{console.log("Servidor Rodando")})