'use strict';

module.exports = function (express) {
    let planoFinanceiroController = express.controllers.planoFinanceiro;

    express.route("/planosFinanceiros")
        .post(planoFinanceiroController.create)
        .put(planoFinanceiroController.update);
}