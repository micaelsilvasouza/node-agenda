const Registro = require("../node-db/Records");

function updateRecords(id, hour, description, callback) {
    Registro.update({horario: hour, descricao: description}, {where: {id: id}})
    .then(callback)
}

module.exports = {updateRecords}