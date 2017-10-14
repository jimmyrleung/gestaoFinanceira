let PlanoFinanceiro = require("../models/planoFinanceiro");
let Error = require("../helpers/customError");
let errorMessages = require("../helpers/constants").errorMsgs;
let planoFinanceiroSequelizeModel = require("../sequelize/models/planoFinanceiro")();
let PlanoFinanceiroDAO = require("../daos/planoFinanceiro");

module.exports = function (express) {
    let planoFinanceiroDAO = new PlanoFinanceiroDAO(planoFinanceiroSequelizeModel);

    this.create = function (nomePlanoFinanceiro) {
        // Cria um novo plano financeiro
        let planoFinanceiro = new PlanoFinanceiro(nomePlanoFinanceiro);

        // Valida informações
        let validationErrors = planoFinanceiro.validar();

        // Se houver erros, retorna 400 (BadRequest). Caso contrário, chama o serviço de criação.
        if (validationErrors.length > 0) {
            return Promise.reject(new Error(errorMessages.MSG_VALIDATION_ERRORS, 400, validationErrors));
        }
        else {
            return planoFinanceiroDAO.create(planoFinanceiro);
        }
    }

    return this;
}