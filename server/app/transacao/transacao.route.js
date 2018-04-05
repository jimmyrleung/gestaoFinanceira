'use strict';
let express = require("../../config/express");
let transacaoController = require("./transacao.controller");

module.exports = function (express) {
    express.route("/transacoes")
        .get(transacaoController.getAll)
        .post(transacaoController.create);

    express.route("/transacoes/:id")
        .put(transacaoController.update);
}