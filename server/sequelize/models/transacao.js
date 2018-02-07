'use strict';
let sequelize = require("../config/sequelize"),
    Sequelize = require("sequelize"),
    modelsConfig = require("./modelsConfig"),
    PlanoFinanceiro = require("./planoFinanceiro"),
    TipoTransacao = require("./tipoTransacao");

let Transacao = sequelize.define('Transacao', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    planoFinanceiroId: { type: Sequelize.INTEGER, references: { model: 'PlanoFinanceiro', key: 'id' }, allowNull: false },
    tipoTransacaoId: { type: Sequelize.INTEGER, references: { model: 'TipoTransacao', key: 'id' }, allowNull: false },
    dataTransacao: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    descricao: { type: Sequelize.STRING(50), allowNull: false },
    valor: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
}, modelsConfig.OPTIONS_MODEL_TRANSACAO);

PlanoFinanceiro.hasMany(Transacao);
Transacao.belongsTo(PlanoFinanceiro, { as: "planoFinanceiro", foreignKey: "planoFinanceiroId" });
TipoTransacao.hasMany(Transacao);
Transacao.belongsTo(TipoTransacao, { as: "tipoTransacao", foreignKey: "tipoTransacaoId" });

module.exports = function () {
    return Transacao;
};