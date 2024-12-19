const Registro = require("../node-db/Records");

function deleteRecords(id, callback) {
    Registro.destroy({where: {id: id}})
    .then(callback)
}

module.exports = {deleteRecords}