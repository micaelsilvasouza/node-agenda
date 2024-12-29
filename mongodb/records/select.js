const Record = require("./Record");

function showRecords(user, date, successfunc, failedfunc) {
    //lean para o handlebars poder usar o dados e não recusar por ser propriedade de um objeto pai
    Record.find({user: user, date: date}).lean().then(successfunc).catch(failedfunc)
}

///showRecords("67700cbb8b70f14f54ca414f", "2024-12-28", (data)=>{console.log(data)})

module.exports = {showRecords}
