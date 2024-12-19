const Registro = require("../node-db/Records");

function exibirRegistroAgenda(res, data) {
    Registro.findAll({attributes: ["id", "horario", "descricao"], where: {data: data}})
    .then((registros)=>{
        res.render("records", {registros: registros, data: data})
    })
}
module.exports = exibirRegistroAgenda
