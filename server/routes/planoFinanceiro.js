'use strict';

module.exports = function (express) {
    let planoFinanceiroController = express.controllers.planoFinanceiro;

    express.route("/planosFinanceiros")
        .get(planoFinanceiroController.getAll)
        .post(planoFinanceiroController.create)
        .put(planoFinanceiroController.update);
}