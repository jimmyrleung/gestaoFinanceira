let planoFinanceiroRoutes = require("./planofinanceiro/planofinanceiro.route");
let transacaoRoutes = require("./transacao/transacao.route");

module.exports = function (express) {
    planoFinanceiroRoutes(express);
    transacaoRoutes(express);
}