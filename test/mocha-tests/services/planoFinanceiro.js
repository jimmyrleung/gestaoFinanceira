let planoFinanceiroService = require('../../../server/app/planofinanceiro/planoFinanceiro.services');
let PlanoFinanceiro = require("../../../server/app/planofinanceiro/PlanoFinanceiro");
let planoFinanceiroSequelizeModel = require("../../../server/sequelize/models/planoFinanceiro");
let PlanoFinanceiroDAO = require("../../../server/app/planofinanceiro/planoFinanceiro.dao");
let planoFinanceiroDAO = new PlanoFinanceiroDAO(planoFinanceiroSequelizeModel);
let expect = require('chai').expect;
let errorMsgs = require("../../../server/helpers/constants").errorMsgs;
let numerics = require("../../../server/helpers/constants").numerics;

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

    it(`#não deve cadastrar um plano financeiro caso existam erros de validação`, (done) => {
        let planoFinanceiro = new PlanoFinanceiro(1, "");

        planoFinanceiroService.create(planoFinanceiro)
            .then(() => done("não deveria ter cadastrado :/"))
            .catch(err => {
                expect(err.message).to.be.equal(errorMsgs.MSG_VALIDATION_ERRORS);
                done();
            });
    });

    it(`#não deve cadastrar um plano financeiro caso o nome já esteja sendo utilizado
         por outro plano financeiro`, (done) => {
            let planoFinanceiro = new PlanoFinanceiro(1, "Planinho");

            planoFinanceiroService.create(planoFinanceiro)
                .then(() => done("não deveria ter cadastrado :/"))
                .catch(err => {
                    expect(err.message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_JA_CADASTRADO);
                    done();
                });
        });

    it("#deve alterar um plano financeiro corretamente", (done) => {
        let planoFinanceiro = new PlanoFinanceiro(1, "Planão");

        planoFinanceiroService.update(planoFinanceiro)
            .then(() => planoFinanceiroService.getById(planoFinanceiro.id))
            .then(planoFinanceiroCadastrado => {
                expect(planoFinanceiroCadastrado.id).to.equal(planoFinanceiro.id);
                expect(planoFinanceiroCadastrado.nome).to.equal(planoFinanceiro.nome);
                done();
            })
            .catch(done);
    });

    it(`#não deve alterar um plano financeiro caso existam erros de validação`, (done) => {
        let planoFinanceiro = new PlanoFinanceiro(1, 123423);

        planoFinanceiroService.update(planoFinanceiro)
            .then(() => done("não deveria ter alterado :/"))
            .catch(err => {
                expect(err.message).to.be.equal(errorMsgs.MSG_VALIDATION_ERRORS);
                done();
            });
    });

    it(`#não deve alterar um plano financeiro caso o novo nome já esteja sendo utilizado
         por outro plano financeiro`, (done) => {
            let planoFinanceiro = new PlanoFinanceiro(1, "Planão");

            planoFinanceiroService.update(planoFinanceiro)
                .then(() => done("não deveria ter alterado :/"))
                .catch(err => {
                    expect(err.message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_JA_CADASTRADO);
                    done();
                });
        });
});