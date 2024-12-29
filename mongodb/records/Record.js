const mongoose = require("../conect-db")

const RecordSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId
    },

    date: {
        type: String
    }, 

    hour: {
        type:  String
    }, 

    description: {
        type: String
    }
})

mongoose.model("records", RecordSchema)

module.exports = mongoose.model("records")
