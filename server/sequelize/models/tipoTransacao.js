'use strict';
var sequelize = require("../config/sequelize"),
    Sequelize = require("sequelize"),
    modelsConfig = require("./modelsConfig");

var TipoTransacao = sequelize.define('TipoTransacao', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    descricao: { type: Sequelize.STRING(50), allowNull: false }
}, modelsConfig.OPTIONS_MODEL_TIPO_TRANSACAO);

module.exports = TipoTransacao;