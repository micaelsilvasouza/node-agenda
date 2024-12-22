const User = require("./User")
const {hash, randomBytes} = require("crypto")

function insertUser(req, res, name, email, password) {
    User.create({
        id: randomBytes(10).toString("hex"),
        nome_usuario: name,
        email: email,
        senha: hash("sha1", password)
    }).then(()=>{
        req.flash("success_msg", "Cadastro realizado com sucesso")
        res.redirect("/login#login")
    }).catch((err)=>{
        if(err.parent.errno == 1062){
            inserirRegistroAgenda(date, hour, description, callback)
        }else{
            req.flash("error_msg", "Falha ao cadastrar")
            res.redirect("/login#register")
        }
    })
}

module.exports = {
    insertUser: insertUser
}