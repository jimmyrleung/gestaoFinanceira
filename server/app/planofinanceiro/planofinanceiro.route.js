'use strict';
let express = require("../../config/express");
let planoFinanceiroController = require("./planoFinanceiro.controller");

module.exports = function (express) {
    express.route("/planosfinanceiros")
        .get(planoFinanceiroController.getAll)
        .post(planoFinanceiroController.create);

    express.route("/planosfinanceiros/:id")
        .put(planoFinanceiroController.update);
}