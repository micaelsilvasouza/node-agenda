const Registro = require("../node-db/Registro");

function exibirRegistroAgenda(res, data) {
    Registro.findAll({attributes: ["id", "horario", "descricao"], where: {data: data}})
    .then((registros)=>{
        res.render("registros", {registros: registros, data: data})
    })
}
module.exports = exibirRegistroAgenda
