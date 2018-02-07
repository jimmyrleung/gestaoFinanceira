let PlanoFinanceiro = require("../models/planoFinanceiro");
let handleError = require("../helpers/handleError");
module.exports = function (express) {

    let planoFinanceiroServices = express.services.planoFinanceiro;

    return {
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
            planoFinanceiroServices.update(new PlanoFinanceiro(req.body.id, req.body.nome, req.body.isDefault))
                .then(() => res.status(200).json())
                .catch(error => handleError(error, res));
        }
    };
}