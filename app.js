const express = require("express")
const app = express()

const session = require("express-session")
const flash = require("express-flash")
const handlebars = require("express-handlebars")
const bodyparser = require("body-parser")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const {validate} = require("email-validator")
const {randomBytes, hash} = require("crypto")

//Funções usuário
const User = require("./mongodb/users/User")
const {insertUser} = require("./mongodb/users/insert")

//Funções agenda
const {showRecords} = require("./mongodb/records/select")
const {insertRecords} = require("./mongodb/records/insert")
const {updateRecords} = require("./mongodb/records/update")
const {deleteRecords}= require("./mongodb/records/delete")
const { allowedNodeEnvironmentFlags } = require("process")

//Configurando sessões
app.use(session({
    secret: randomBytes(20).toString("hex"), 
    resave: true,
    saveUninitialized: true
}))

//Configurando passport
app.use(passport.initialize())
app.use(passport.session())

//Configurando flash
app.use(flash())

//Configurando handlebars template engine
app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//Configurando body-parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//Configurando arquivos estaticos
app.use(express.static("public"))

//Configurando Strategy
passport.use(new localStrategy({usernameField: "email"}, (email, password, done)=>{
    if(validate(email)){
        User.find({email: email}).then(data => {
            if(data.length > 0 && hash("sha1", password) === data[0].password){
                done(null, data[0])
            }else{
                done(null, false, {message: "Usuário ou senha incorretos"})
            }
        })
    }else{
        done(null, false, {message: "Email inválido"})
    }
}))

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((id, done)=>{
    done(null, id)
})

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/login")
    }
}

//Configurando middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    next()
})

//Página principal
app.get("/", (req, res)=>{
    res.render("landing")
})

//Página de login e fazer cadastro
app.get("/login", (req, res)=>{
    res.render("login", {header: true, footer: true})
})

//Sair
app.get("/logout", (req, res)=>{
    req.logout({keepSessionInfo: false}, (err)=>{req.flash("error_msg", "Houve um erro ao realizar o logout")})
    res.redirect("/login")
})

//Página do calendário
app.get("/agenda", isAuthenticated ,(req, res)=>{
    res.render("calendar", {nav: {link: "/logout", title: "LOGOUT"}, header: true, footer: true})
})

//Ações da agenda
app.post("/registros", isAuthenticated, (req, res)=>{
    let user = req.user
    let body = req.body
    let id = body.id
    let date = body.date
    let hour = body.hour
    let description = body.description
    
    if ((hour == undefined || hour == "") && (description == undefined || description == "") &&( id == undefined) && (date != undefined && date != "")) {
        showRecords(user._id, date, 
            (data)=>{
                res.render("records", {date: date, records: data})
            },
            ()=>{req.flash("error_msg", "Erro ao buscar registros")}
        )
    }
    
    if((hour != undefined && hour != "") && (description != undefined && description != "") && (date != undefined && date != "") && (id == undefined)){
        insertRecords(user._id, date, hour, description, 
            //successfunc
            () => {
                showRecords(user._id, date, 
                    (data)=>{res.render("records", {date: date, records: data})},
                    ()=>{req.flash("error_msg", "Erro ao buscar registros")}
                )
            }, 

            //failedfunc
            ()=>{req.flash("error_msg", "Erro ao inserir registro")}
        )
    }
    
    if((hour != undefined && hour != "") && (description != undefined && description != "") && (date != undefined && date != "") && (id != undefined)){
        updateRecords(id, user._id, hour, description,
            //successfunc
            ()=>{
                showRecords(user._id, date, 
                    (data)=>{res.render("records", {date: date, records: data})},
                    ()=>{req.flash("error_msg", "Erro ao buscar registros")}
                )
            },

            //failedfunc
            ()=>{req.flash("error_msg", "Erro ao atualizar registro")}
        )
        
    }
    if((hour == undefined || hour == "") && (description == undefined || description == "") && (id != undefined) && (date != undefined && date != "")){
        deleteRecords(id, user._id,
            //successfunc
            ()=>{
                showRecords(user._id, date, 
                    (data)=>{res.render("records", {date: date, records: data})},
                    ()=>{req.flash("error_msg", "Erro ao buscar registros")}
                )
            },

            //failedfunc
            ()=>{req.flash("error_msg", "Erro ao deletar registro")}
        )
    }
})

//Logar
app.post("/validar-usuario", passport.authenticate("local", {
    successRedirect: "/agenda",
    failureRedirect: "/login",
    failureFlash: true
}))

app.post("/cadastrar-usuario", (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirmpass
    
    let error = false

    if((!username || typeof username === undefined) || (!email || typeof email === undefined) || (!password || typeof password === undefined) || (!confirm_password || typeof confirm_password === undefined)){
        req.flash("error_msg", "Dados incompletos")
        error = true
    }

    if(!validate(email)){
        req.flash("error_msg", "Email Inválido")
        error = true
    }

    if(password.length < 8 || password !== confirm_password){
        req.flash("error_msg", "Senhas não condizentes ou em formato errado")
        error = true
    }

    if(error){
        res.redirect("/login#register")
    }else{
        User.find({email: email}).then(data=>{
            if(data.length > 0){
                req.flash("success_msg", "Email já cadastrado")
                res.redirect("/login#register")
            }else{
                insertUser(username, email, password, 
                    ()=>{
                        req.flash("error_msg", "Usuário cadastrado com sucesso.")
                        res.redirect("/login")
                    },

                    ()=>{
                        req.flash("error_msg", "Falha ao registrar usuário.")
                        res.redirect("/login#register")
                    }
            )   
            }
        })
    }
       
})

const PORT = 8081
app.listen(PORT, ()=>{console.log("Servidor Rodando")})