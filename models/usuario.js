module.exports = function (app) {

    var db = require('../libs/db_connect')();
    const mongoose = require('mongoose');

    const contatoSchema = new mongoose.Schema({
        nome: String,
        email: String
    });

    const usuarioSchema = new mongoose.Schema({
        nome: { type: String, required: true },
        email: { type: String, required: true, index: { unique: true } },
        contatos: [contatoSchema]
    });

    return db.model('usuarios', usuarioSchema);
};