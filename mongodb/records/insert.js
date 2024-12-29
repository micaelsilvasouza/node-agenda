const Record = require("./Record")

function insertRecords(user, date, hour, description, successfunc, failedfunc) {
    new Record({
        user: user,
        date: date,
        hour: hour,
        description: description
    }).save().then(successfunc).catch(failedfunc)
}

///insertRecords("67700cbb8b70f14f54ca414f","2024-12-28", "18:00", "algo a", ()=>{console.log("INSERIDO")})

module.exports = {insertRecords}