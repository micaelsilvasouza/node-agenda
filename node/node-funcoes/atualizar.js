const Registro = require("../node-db/Registro");

function atualizarRegistroAgenda(id, horario, descricao, callback) {
    Registro.update({horario: horario, descricao: descricao}, {where: {id: id}})
    .then(callback)
}

module.exports = atualizarRegistroAgenda