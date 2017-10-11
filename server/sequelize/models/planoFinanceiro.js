'use strict';
var sequelize = require("../config/sequelize"),
    Sequelize = require("sequelize"),
    modelsConfig = require("./modelsConfig");

var PlanoFinanceiro = sequelize.define('PlanoFinanceiro', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: Sequelize.STRING(30), allowNull: false }
}, modelsConfig.OPTIONS_MODEL_PLANO_FINANCEIRO);

module.exports = function () {
    return PlanoFinanceiro;
};