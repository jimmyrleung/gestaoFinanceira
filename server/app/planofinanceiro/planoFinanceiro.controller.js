let PlanoFinanceiro = require("./PlanoFinanceiro");
let handleError = require("../../helpers/handleError");
let planoFinanceiroServices = require("./planoFinanceiro.services");

module.exports = {
    create: function (req, res) {
        planoFinanceiroServices.create(new PlanoFinanceiro(null, req.body.nome, false))
            .then(() => res.status(200).json())
            .catch(error => handleError(error, res));
    },

    getAll: function (req, res) {
        planoFinanceiroServices.getAll()
            .then(planosFinanceiros => res.status(200).json(planosFinanceiros))
            .catch(error => handleError(error, res));
    },

    update: function (req, res) {
        planoFinanceiroServices.update(new PlanoFinanceiro(req.params.id, req.body.nome, req.body.isDefault))
            .then(() => res.status(200).json())
            .catch(error => handleError(error, res));
    }
}