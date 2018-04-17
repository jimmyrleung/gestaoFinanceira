let PlanoFinanceiro = require("../../../server/app/planofinanceiro/PlanoFinanceiro");
let expect = require('chai').expect;
let errorMsgs = require("../../../server/helpers/constants").errorMsgs;
let numerics = require("../../../server/helpers/constants").numerics;

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
