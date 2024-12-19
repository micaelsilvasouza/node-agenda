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
    let date = body.date
    let hour = body.hour
    let description = body.description

    if ((hour == undefined || hour == "") && (description == undefined || description == "") &&( id == undefined || id == "") && (date != undefined && date != "")) {
        showRecords(res, date)
    }

    if((hour != undefined && hour != "") && (description != undefined && description != "") && (date != undefined && date != "") && (id == undefined || id == "")){
        insertRecords(date, hour, description, ()=>{showRecords(res, date)})
    }

    if((hour != undefined && hour != "") && (description != undefined && description != "") && (date != undefined && date != "") && (id != undefined && id != "")){
        updateRecords(id, hour, description, ()=>{showRecords(res, date)})
    }

    if((hour == undefined || hour == "") && (description == undefined || description == "") && (id != undefined && id != "") && (date != undefined && date != "")){
        deleteRecords(id, ()=>showRecords(res, date))
    }
})


const PORT = 8081
app.listen(PORT, ()=>{console.log("Servidor Rodando")})