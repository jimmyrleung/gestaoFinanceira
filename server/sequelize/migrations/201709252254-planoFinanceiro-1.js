'use strict';
var modelsConfig = require("../models/modelsConfig");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('PlanoFinanceiro', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            nome: { type: Sequelize.STRING(30), allowNull: false }
        }, modelsConfig.OPTIONS_MODEL_PLANO_FINANCEIRO);
    },

    down: function (queryInterface) {
        return queryInterface.dropTable('PlanoFinanceiro');
    }
};