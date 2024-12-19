const Registro = require("../node-db/Records");

function deletarRegistroAgenda(id, callback) {
    Registro.destroy({where: {id: id}})
    .then(callback)
}

module.exports = deletarRegistroAgenda