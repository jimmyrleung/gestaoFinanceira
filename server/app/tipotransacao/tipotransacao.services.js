let Error = require("../../helpers/customError");
let errorMessages = require("../../helpers/constants").errorMsgs;
let TipoTransacao = require("./TipoTransacao");
let tipoTransacaoSequelizeModel = require("../../sequelize/models/tipoTransacao");
let TipoTransacaoDAO = require("./tipotransacao.dao");
let tipoTransacaoDAO = new TipoTransacaoDAO(tipoTransacaoSequelizeModel);
// let mongoComponent = require("../mongoComponent");
// let mongodboptions = require("../../config/config").MONGODB_OPTIONS;

module.exports = {
    create: function (tipoTransacao) {
        // Valida informações
        let validationErrors = tipoTransacao.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de criação.
        return (validationErrors.length > 0) ?
            Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors)) :
            tipoTransacaoDAO.create(tipoTransacao);
    },

    update: function (tipoTransacao) {
        // Valida informações
        let validationErrors = tipoTransacao.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de alteração.
        return (validationErrors.length > 0) ?
            Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors)) :
            tipoTransacaoDAO.updateById(tipoTransacao.id, tipoTransacao, ['descricao']);
    },

    getById: function (idTipoTransacao) {
        return tipoTransacaoDAO.findOneById(idTipoTransacao);
    },

    getAll: function () {
        return tipoTransacaoDAO.findAll();
    },

    deleteById: function (idTipoTransacao) {
        return tipoTransacaoDAO.deleteById(idTipoTransacao);
    }
}