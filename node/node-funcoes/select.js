const Registro = require("../node-db/Records");

function showRecords(res, data) {
    Registro.findAll({attributes: ["id", "horario", "descricao"], where: {data: data}})
    .then((registros)=>{
        res.render("records", {registros: registros, data: data})
    })
}
module.exports = {showRecords}
