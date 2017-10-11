'use strict';
var sequelize = require("../config/sequelize"),
    Sequelize = require("sequelize"),
    modelsConfig = require("./modelsConfig"),
    PlanoFinanceiro = require("./planoFinanceiro"),
    TipoPlanoReserva = require("./TipoPlanoReserva");

var PlanoReserva = sequelize.define('PlanoReserva', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
     tipoPlanoReservaId: { type: Sequelize.INTEGER, references: { model: 'TipoPlanoReserva', key: 'id' } },
     planoFinanceiroId: { type: Sequelize.INTEGER, references: { model: 'PlanoFinanceiro', key: 'id' } },
    valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
}, modelsConfig.modelsConfig.OPTIONS_MODEL_PLANO_RESERVA);

PlanoFinanceiro.hasMany(PlanoReserva);
PlanoReserva.belongsTo(PlanoFinanceiro, { as: "planoFinanceiro", foreignKey: "planoFinanceiroId" });
TipoPlanoReserva.hasMany(PlanoReserva);
PlanoReserva.belongsTo(TipoPlanoReserva, { as: "tipoPlanoReserva", foreignKey: "tipoPlanoReservaId" });

module.exports = function () {
    return PlanoReserva;
};