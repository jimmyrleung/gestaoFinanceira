let PlanoFinanceiro = require("../models/planoFinanceiro");

module.exports = function (express) {
    let planoFinanceiroDAO = express.daos.planoFinanceiro;

    this.createService = function (nomePlanoFinanceiro) {
        return new Promise((resolve, reject) => {

        })

        // Cria um novo plano financeiro
        let planoFinanceiro = new PlanoFinanceiro(nomePlanoFinanceiro);

        // Valida informações
        validationErrors = planoFinanceiro.validar();

        // Se houver erros, retorna 401. Caso contrário, chama o serviço de criação.
        if (validationErrors.length > 0) {
            return Promise.reject(validationErrors);
        }
        else {
            console.log(planoFinanceiro);
            resolve();
        }
    }

    return this;
}