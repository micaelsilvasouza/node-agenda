const Registros = require("../node-db/Records")
const {randomBytes} = require("crypto")

function insertRecords(data, horario, descricao, callback) {
    Registros.create({
        id: randomBytes(10).toString("hex"),
        data: data,
        horario: horario,
        descricao: descricao
    }).then(callback)
    .catch((err)=>{
        if(err.parent.errno == 1062){
            inserirRegistroAgenda(data, horario, descricao, callback)
        }else{
            console.log(err)
        }
    })
}

//inserirRegistroAgenda("2024-12-08", "08:00", "ALEATORIA", ()=>{console.log("INSERIDO")})

module.exports = {insertRecords}