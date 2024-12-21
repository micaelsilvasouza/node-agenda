const Record = require("../node-db/Record");

function showRecords(res, date) {
    Record.findAll({attributes: ["id", "horario", "descricao"], where: {data: date}})
    .then((registros)=>{
        res.render("records", {registros: registros, data: date})
    })
}
module.exports = {showRecords}
