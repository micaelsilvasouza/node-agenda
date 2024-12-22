const Record = require("./Record");

function deleteRecords(id, user,callback) {
    Record.destroy({where: {id: id, usuario: user}})
    .then(callback)
}

module.exports = {deleteRecords}