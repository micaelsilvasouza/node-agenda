const Registro = require("../node-db/Records");

function atualizarRegistroAgenda(id, horario, descricao, callback) {
    Registro.update({horario: horario, descricao: descricao}, {where: {id: id}})
    .then(callback)
}

module.exports = atualizarRegistroAgenda