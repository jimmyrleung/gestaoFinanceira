'use strict';
var modelsConfig = require("../models/modelsConfig");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('TipoPlanoReserva', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            descricao: { type: Sequelize.STRING(50), allowNull: false }
        }, modelsConfig.OPTIONS_MODEL_TIPO_PLANO_RESERVA);
    },

    down: function (queryInterface) {
        return queryInterface.dropTable('TipoPlanoReserva');
    }
};