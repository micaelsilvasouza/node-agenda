const Record = require("./Record");

function deleteRecords(id, user,successfunc, failedfunc) {
    Record.deleteOne({_id: id, user: user})
    .then(successfunc).catch(failedfunc)
}

//deleteRecords("67700d9c7436def52aa60097", "67700cbb8b70f14f54ca414f", ()=>{console.log("Deletado")})

module.exports = {deleteRecords}