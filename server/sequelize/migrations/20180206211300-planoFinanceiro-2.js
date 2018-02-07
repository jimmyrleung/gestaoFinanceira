'use strict';
var modelsConfig = require("../models/modelsConfig");

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('PlanoFinanceiro', 'isDefault', {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        });
    },

    down: function (queryInterface) {
        return queryInterface.removeColumn('PlanoFinanceiro', 'isDefault');
    }
};