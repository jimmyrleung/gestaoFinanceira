let PlanoFinanceiro = require("../models/planoFinanceiro");

module.exports = function (express) {

    let planoFinanceiroServices = express.services.planoFinanceiro;

    this.create = function (req, res) {
        planoFinanceiroServices.create(req.body.nome)
            .then(() => res.status(200).json())
            .catch()
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