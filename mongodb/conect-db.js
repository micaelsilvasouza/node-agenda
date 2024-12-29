const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://<username>:<password>s@cluster0.7zhsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{ 
    serverApi: { version: '1', strict: true, deprecationErrors: true } 
}).then(()=>{
    console.log("Conectado com sucesso")
}).catch(err => {
    console.log("Não foi possivel se conectar: ", err)
})

module.exports = mongoose