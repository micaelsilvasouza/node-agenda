const User = require("./User")
const {hash} = require("crypto")

function insertUser(name, email, password, successfunc, failedfunc) {
    new User({
        name: name,
        email: email,
        password: hash("sha1", password)
    }).save().then(successfunc).catch(failedfunc)
}

//insertUser("Teste", "teste@email.com", "123456789")

module.exports = {
    insertUser: insertUser
}