const  mongo  = require("mongoose")

const schema = new mongo.Schema({
    nome: { type: String, required: true ,minlength: 3},
    preco: { type: Number, required: true }
})



module.exports = mongo.model('Produto', schema)