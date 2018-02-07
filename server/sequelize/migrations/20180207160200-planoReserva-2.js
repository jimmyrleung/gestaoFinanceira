'use strict';
var modelsConfig = require("../models/modelsConfig");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('PlanoReserva', 'descricao', {
            type: Sequelize.STRING(50), allowNull: false
        });
    },

    down: function (queryInterface) {
        return queryInterface.removeColumn('PlanoReserva', 'isDefault');
    }
};