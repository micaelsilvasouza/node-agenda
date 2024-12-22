const {Sequelize, sequelize} = require("../conect-db")


const User = sequelize.define("usuarios", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },

    nome_usuario:{
        type: Sequelize.STRING
    },

    email:{
        type: Sequelize.STRING
    }, 

    senha:{
        type: Sequelize.STRING
    }
})

//User.sync()

module.exports = User