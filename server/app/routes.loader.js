let planoFinanceiroRoutes = require("./planofinanceiro/planofinanceiro.route");

module.exports = function (express) {
    planoFinanceiroRoutes(express);
}