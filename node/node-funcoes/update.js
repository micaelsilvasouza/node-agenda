const Record = require("../node-db/Record");

function updateRecords(id, hour, description, callback) {
    Record.update({horario: hour, descricao: description}, {where: {id: id}})
    .then(callback)
}

module.exports = {updateRecords}