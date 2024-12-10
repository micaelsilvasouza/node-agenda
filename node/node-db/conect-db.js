const Sequelize = require("sequelize")
const sequelize = new Sequelize("node_agenda", "gestoragenda", "123", {
    host: "localhost",
    dialect: "mysql"
})

/*con.authenticate().then(()=>{
    console.log("conecção bem sucedida à agenda node")
}).catch(()=>{
    console.log("Não foi conectado à agenda node")
})*/

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}