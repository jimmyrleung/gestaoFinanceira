'use strict';
let tipoTransacaoSequelizeModel = require("../models/tipoTransacao");
let TipoTransacaoDAO = require("../../app/tipotransacao/tipotransacao.dao");
let tipoTransacaoDAO = new TipoTransacaoDAO(tipoTransacaoSequelizeModel);

module.exports = {
  up: function (queryInterface) {
    return tipoTransacaoDAO.findAll()
      .then(tiposTransacao => {
        if (tiposTransacao.length === 0) {
          return queryInterface.bulkInsert('TipoTransacao', [
            { id: 1, descricao: "Recebimento" },
            { id: 2, descricao: "Despesa" },
            { id: 3, descricao: "Aplicação" }
          ], {})
        }
      });
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('TipoTransacao', null, {});
  }
};