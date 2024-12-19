const Registro = require("../node-db/Records");

function showRecords(res, date) {
    Registro.findAll({attributes: ["id", "horario", "descricao"], where: {data: date}})
    .then((registros)=>{
        res.render("records", {registros: registros, data: date})
    })
}
module.exports = {showRecords}
