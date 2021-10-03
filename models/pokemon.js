const mongoose = require ("mongoose");

const PokemonSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },

    _id: {
        type: String
    },

    sexo: {
        type: String,
        require: true
    },

    classificado: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('pokemon',PokemonSchema)