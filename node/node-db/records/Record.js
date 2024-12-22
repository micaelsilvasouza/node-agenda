const {Sequelize, sequelize} = require("../conect-db")

const Record = sequelize.define("registros", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    }, 

    usuario:{
        type: Sequelize.STRING,
    },

    data: {
        type: Sequelize.DATEONLY
    }, 

    horario: {
        type: Sequelize.TIME
    }, 

    descricao: {
        type: Sequelize.STRING
    }
})

module.exports = Record

//Record.sync({force: true})