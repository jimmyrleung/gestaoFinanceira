'use strict';
var sequelize = require("../config/sequelize"),
    Sequelize = require("sequelize"),
    modelsConfig = require("./modelsConfig");

var PlanoFinanceiro = sequelize.define('PlanoFinanceiro', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: Sequelize.STRING(30), allowNull: false },
    isDefault: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
}, modelsConfig.OPTIONS_MODEL_PLANO_FINANCEIRO);

module.exports = PlanoFinanceiro;