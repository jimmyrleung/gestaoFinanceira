'use strict';
var modelsConfig = require("../models/modelsConfig");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('PlanoReserva', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            tipoPlanoReservaId: { type: Sequelize.INTEGER, references: { model: 'TipoPlanoReserva', key: 'id' }, allowNull: false },
            planoFinanceiroId: { type: Sequelize.INTEGER, references: { model: 'PlanoFinanceiro', key: 'id' }, allowNull: false },
            valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
        }, modelsConfig.OPTIONS_MODEL_PLANO_RESERVA);
    },

    down: function (queryInterface) {
        return queryInterface.dropTable('PlanoReserva');
    }
};