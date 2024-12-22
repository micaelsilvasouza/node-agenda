const Record = require("./Record");

function updateRecords(id, user, hour, description, callback) {
    Record.update({horario: hour, descricao: description}, {where: {id: id, usuario: user}})
    .then(callback)
}

module.exports = {updateRecords}