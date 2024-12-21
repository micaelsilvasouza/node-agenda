const {Sequelize, sequelize} = require("./conect-db")

const Record = sequelize.define("registros", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
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