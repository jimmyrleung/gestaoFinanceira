let Error = require("../../helpers/customError");
let errorMessages = require("../../helpers/constants").errorMsgs;
let Transacao = require("./Transacao");
let transacaoSequelizeModel = require("../../sequelize/models/transacao");
let TransacaoDAO = require("./transacao.dao");
let transacaoDAO = new TransacaoDAO(transacaoSequelizeModel);
// let mongoComponent = require("../mongoComponent");
// let mongodboptions = require("../../config/config").MONGODB_OPTIONS;

module.exports = {
    create: function (transacao) {
        // Valida informações
        let validationErrors = transacao.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de criação.
        return (validationErrors.length > 0) ?
            Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors)) :
            transacaoDAO.create(transacao);
    },

    update: function (transacao) {
        // Valida informações
        let validationErrors = transacao.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de alteração.
        return (validationErrors.length > 0) ?
            Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors)) :
            transacaoDAO.updateById(transacao.id, transacao, ['nome']);
    },

    getById: function (idTransacao) {
        return transacaoDAO.findOneById(idTransacao);
    },

    getAll: function () {
        return transacaoDAO.findAll();
    },

    deleteById: function (idTransacao) {
        return transacaoDAO.deleteById(idTransacao);
    }
}