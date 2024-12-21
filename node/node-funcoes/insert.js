const Record = require("../node-db/Record")
const {randomBytes} = require("crypto")

function insertRecords(date, hour, description, callback) {
    Record.create({
        id: randomBytes(10).toString("hex"),
        data: date,
        horario: hour,
        descricao: description
    }).then(callback)
    .catch((err)=>{
        if(err.parent.errno == 1062){
            inserirRegistroAgenda(date, hour, description, callback)
        }else{
            console.log(err)
        }
    })
}

//inserirRegistroAgenda("2024-12-08", "08:00", "ALEATORIA", ()=>{console.log("INSERIDO")})

module.exports = {insertRecords}