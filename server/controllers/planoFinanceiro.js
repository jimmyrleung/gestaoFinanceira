let PlanoFinanceiro = require("../models/planoFinanceiro");
let handleError = require("../helpers/handleError");
module.exports = function (express) {

    let planoFinanceiroServices = express.services.planoFinanceiro;

    return {
        create: function (req, res) {
            planoFinanceiroServices.create(req.body.nome)
                .then(() => res.status(200).json())
                .catch(error => handleError(error, res));
        }
    };
}