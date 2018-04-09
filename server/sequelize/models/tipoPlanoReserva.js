'use strict';
var sequelize = require("../config/sequelize"),
    Sequelize = require("sequelize"),
    modelsConfig = require("./modelsConfig");

var TipoPlanoReserva = sequelize.define('TipoPlanoReserva', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: { type: Sequelize.STRING(50), allowNull: false }
}, modelsConfig.OPTIONS_MODEL_TIPO_PLANO_RESERVA);

module.exports = TipoPlanoReserva;