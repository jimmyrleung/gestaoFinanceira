'use strict';
var modelsConfig = require("../models/modelsConfig");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Transacao', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            planoFinanceiroId: { type: Sequelize.INTEGER, references: { model: 'PlanoFinanceiro', key: 'id' }, allowNull: false },
            tipoTransacaoId: { type: Sequelize.INTEGER, references: { model: 'TipoTransacao', key: 'id' }, allowNull: false },
            dataTransacao: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            descricao: { type: Sequelize.STRING(50), allowNull: false },
            valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
        }, modelsConfig.OPTIONS_MODEL_TRANSACAO);
    },

    down: function (queryInterface) {
        return queryInterface.dropTable('Transacao');
    }
};