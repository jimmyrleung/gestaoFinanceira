let PlanoFinanceiro = require("../models/planoFinanceiro");

module.exports = function (express) {

    this.createService = function (nomePlanoFinanceiro) {
        // Cria um novo plano financeiro
        let planoFinanceiro = new PlanoFinanceiro(nomePlanoFinanceiro);

        // Valida informações
        validationErrors = planoFinanceiro.validar();

        // Se houver erros, retorna 401. Caso contrário, chama o serviço de criação.
        if (validationErrors.length > 0) {
            res.status(401).json({ errors: validationErrors });
        }
        else {
            console.log(planoFinanceiro);
            res.json();
        }
    }

    return this;
}