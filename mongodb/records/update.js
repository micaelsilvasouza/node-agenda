const Record = require("./Record");

function updateRecords(id, user, hour, description, successfunc, failedfunc) {
    Record.updateOne(
        {_id: id, user: user}, 
        {$set: {
            hour: hour, 
            description: description
        }
    }).then(successfunc).catch(failedfunc)

}

//updateRecords("6770101ce766787c38cf7d67", "67700cbb8b70f14f54ca414f", "10:25", "description record with user id", ()=>{console.log("Atualizado")})

module.exports = {updateRecords}