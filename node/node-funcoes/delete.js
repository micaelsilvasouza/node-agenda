const Record = require("../node-db/Record");

function deleteRecords(id, callback) {
    Record.destroy({where: {id: id}})
    .then(callback)
}

module.exports = {deleteRecords}