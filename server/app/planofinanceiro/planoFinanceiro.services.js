let Error = require("../../helpers/customError");
let errorMessages = require("../../helpers/constants").errorMsgs;
let PlanoFinanceiro = require("./PlanoFinanceiro");
let planoFinanceiroSequelizeModel = require("../../sequelize/models/planoFinanceiro")();
let PlanoFinanceiroDAO = require("./planoFinanceiro.dao");
let planoFinanceiroDAO = new PlanoFinanceiroDAO(planoFinanceiroSequelizeModel);
// let mongoComponent = require("../mongoComponent");
// let mongodboptions = require("../../config/config").MONGODB_OPTIONS;

module.exports = {
    create: function (planoFinanceiro) {
        // Valida informações
        let validationErrors = planoFinanceiro.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de criação.
        if (validationErrors.length > 0) {
            return Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors));
        }
        else {
            return planoFinanceiroDAO.findOneQuery({ where: { nome: planoFinanceiro.nome } })
                .then(planoFinanceiroCadastrado => {
                    if (!planoFinanceiroCadastrado) {
                        return planoFinanceiroDAO.create(planoFinanceiro);
                    }
                    else {
                        return Promise.reject(new Error(errorMessages.MSG_PLANO_FINANCEIRO_JA_CADASTRADO, 400));
                    }
                });
        }
    },

    update: function (planoFinanceiro) {
        // Valida informações
        let validationErrors = planoFinanceiro.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de alteração.
        if (validationErrors.length > 0) {
            return Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors));
        }
        else {
            return planoFinanceiroDAO.findOneQuery({ where: { nome: planoFinanceiro.nome } })
                .then(planoFinanceiroCadastrado => {
                    if (!planoFinanceiroCadastrado) {
                        return planoFinanceiroDAO.updateById(planoFinanceiro.id, planoFinanceiro, ['nome']);
                    }
                    else {
                        return Promise.reject(new Error(errorMessages.MSG_PLANO_FINANCEIRO_JA_CADASTRADO, 400));
                    }
                });
        }
    },

    getById: function (idPlanoFinanceiro) {
        return planoFinanceiroDAO.findOneById(idPlanoFinanceiro);
    },

    getAll: function () {
        return planoFinanceiroDAO.findAll();
    },

    deleteById: function (idPlanoFinanceiro) {
        return planoFinanceiroDAO.deleteById(idPlanoFinanceiro);
    },
}