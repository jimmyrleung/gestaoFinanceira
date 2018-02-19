let planoFinanceiroService = require('../../server/app/planofinanceiro/planoFinanceiro.services');
let PlanoFinanceiro = require("../../server/app/planofinanceiro/PlanoFinanceiro");
let planoFinanceiroSequelizeModel = require("../../server/sequelize/models/planoFinanceiro")();
let PlanoFinanceiroDAO = require("../../server/app/planofinanceiro/planoFinanceiro.dao");
let planoFinanceiroDAO = new PlanoFinanceiroDAO(planoFinanceiroSequelizeModel);
let expect = require('chai').expect;

describe("Com relação ao cadastro de plano financeiro", () => {
    before(function (done) {
        this.timeout(3500);
        planoFinanceiroDAO.deleteAll()
            .then(function () {
                done();
            });
    });

    it("#deve cadastrar um plano financeiro corretamente", (done) => {
        let planoFinanceiro = new PlanoFinanceiro(1, "Planinho");

        planoFinanceiroService.create(planoFinanceiro)
            .then(() => planoFinanceiroService.getById(planoFinanceiro.id))
            .then(planoFinanceiroCadastrado => {
                expect(planoFinanceiroCadastrado.id).to.equal(planoFinanceiro.id);
                expect(planoFinanceiroCadastrado.nome).to.equal(planoFinanceiro.nome);
                done();
            })
            .catch(done);
    });
});
