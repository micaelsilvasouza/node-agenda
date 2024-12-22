const Record = require("./Record");

function showRecords(res, user, date) {
    Record.findAll({attributes: ["id", "horario", "descricao"], where: {usuario: user, data: date}})
    .then((registros)=>{
        res.render("records", {registros: registros, data: date})
    })
}
module.exports = {showRecords}
