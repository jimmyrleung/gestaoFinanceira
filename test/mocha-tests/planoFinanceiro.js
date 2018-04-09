let planoFinanceiroService = require('../../server/app/planofinanceiro/planoFinanceiro.services');
let PlanoFinanceiro = require("../../server/app/planofinanceiro/PlanoFinanceiro");
let planoFinanceiroSequelizeModel = require("../../server/sequelize/models/planoFinanceiro");
let PlanoFinanceiroDAO = require("../../server/app/planofinanceiro/planoFinanceiro.dao");
let planoFinanceiroDAO = new PlanoFinanceiroDAO(planoFinanceiroSequelizeModel);
let expect = require('chai').expect;
let errorMsgs = require("../../server/helpers/constants").errorMsgs;
let numerics = require("../../server/helpers/constants").numerics;

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

describe("Com relação ao modelo 'Plano Financeiro'", () => {
    before(function (done) {
        this.timeout(3500);
        done();
    });

    it("#deve mostrar mensagem de nome obrigatório caso não seja informado um nome.", (done) => {
        let planoFinanceiroEmpty = new PlanoFinanceiro(1, "");
        let planoFinanceiroNull = new PlanoFinanceiro(1, null);
        let planoFinanceiroUndefined = new PlanoFinanceiro(1, undefined);

        expect(planoFinanceiroEmpty.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_NAO_DEFINIDO);
        expect(planoFinanceiroNull.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_NAO_DEFINIDO);
        expect(planoFinanceiroUndefined.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_NAO_DEFINIDO);
        done();
    });

    it(`#deve mostrar mensagem de nome em formato inválido caso o nome informado
        não seja do tipo string`, (done) => {
            let planoFinanceiroDate = new PlanoFinanceiro(1, new Date());
            let planoFinanceiroNumber = new PlanoFinanceiro(1, 2323232);
            let planoFinanceiroObject = new PlanoFinanceiro(1, { queria: "ser uma string" });
            let planoFinanceiroArray = new PlanoFinanceiro(1, ["talvez", "eu seja", "uma string"]);

            expect(planoFinanceiroDate.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO);
            expect(planoFinanceiroNumber.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO);
            expect(planoFinanceiroObject.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO);
            expect(planoFinanceiroArray.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO);
            done();
        });

    it(`#deve mostrar mensagem de max length excedido em formato inválido caso o nome informado
        ultrapasse o max length definido`, (done) => {
            let nomeComExcedente;
            for (let i = 0; i < numerics.NOME_PLANO_FINANCEIRO_MAX_LENGTH; i++) {
                nomeComExcedente += "A";
            }
            nomeComExcedente += "excedente";

            let planoFinanceiro = new PlanoFinanceiro(1, nomeComExcedente);

            expect(planoFinanceiro.validar()[0].message).to.be.equal(errorMsgs.MSG_PLANO_FINANCEIRO_NOME_MAX_LENGTH_EXCEDIDO);
            done();
        });
});
