let validationErrors = require("../../helpers/constants").errorMsgs;
let numerics = require("../../helpers/constants").numerics;
let errorTypes = require("../../helpers/constants").errorTypes;
let StringValidator = require("../../helpers/StringValidator");

module.exports = class Transacao {
    constructor(id, planoFinanceiroId, tipoTransacaoId, dataTransacao, descricao, valor) {
        this.id = id || null;
        this.planoFinanceiroId = planoFinanceiroId;
        this.tipoTransacaoId = tipoTransacaoId;
        this.dataTransacao = dataTransacao;
        this.descricao = descricao;
        this.valor = valor;
    };

    validar() {
        let errors = this.validarFKS()
            .concat(this.validarData())
            .concat(this.descricao())
            .concat(this.valor());
        return errors;
    };

    validarDescricao() {
        let errors = [];

        const stringValidator = new StringValidator({
            stringToValidate: this.descricao,
            shouldValidateMaxLength: true,
            maxLength: numerics.DESCR_TRANSACAO_MAX_LENGTH,
            shouldValidateMinLength: false,
            verbose: true,
            shouldValidateEmptyString: true,
            shouldTestRegex: false,
        });

        const validation = stringValidator.validate();
        if (validation.isValid) return errors;

        if (validation.errorType === errorTypes.EMPTY_VALUE_ERROR) {
            errors.push({ field: "descrição", message: validationErrors.MSG_TRANSACAO_DESCRICAO_NAO_DEFINIDA });
        }
        else if (validation.errorType === errorTypes.WRONG_TYPE_ERROR) {
            errors.push({ field: "descrição", message: validationErrors.MSG_TRANSACAO_DESCRICAO_FORMATO_INVALIDO });
        }
        else if (validation.errorType === errorTypes.STRING_MAX_LENGTH_ERROR) {
            errors.push({ field: "descrição", message: validationErrors.MSG_TRANSACAO_DESCRICAO_MAX_LENGTH_EXCEDIDO });
        }

        return errors;
    };

    validarValor() {
        let errors = [];
        let valorRegex = /^\d{1,12}\.?\d{0,2}$/;

        if (!this.valor) {
            errors.push({ field: "valor", message: validationErrors.MSG_TRANSACAO_VALOR_NAO_INFORMADO });
        }
        else if (typeof this.valor !== "number" && !valorRegex.test(this.valor)) {
            errors.push({ field: "valor", message: validationErrors.MSG_TRANSACAO_VALOR_FORMATO_INVALIDO });
        }
        else if (this.valor <= 0) {
            errors.push({ field: "valor", message: validationErrors.MSG_TRANSACAO_VALOR_ZERO_OU_NEGATIVO });
        }

        return errors;
    };

    validarData() {
        let errors = [];

        if (!this.dataTransacao) {
            errors.push({ field: "dataTransacao", message: validationErrors.MSG_TRANSACAO_DATA_NAO_INFORMADA });
        }
        // new Date("anything") return an instance of Date with 'Invalid Date', 
        // so we also need to check if it isn't a NaN
        else if (this.dataTransacao instanceof Date && !isNaN(this.dataTransacao.valueOf)) {
            errors.push({ field: "dataTransacao", message: validationErrors.MSG_TRANSACAO_DATA_FORMATO_INVALIDO });
        }
    };

    validarFKS() {
        let errors = [];

        if (!this.planoFinanceiroId) {
            errors.push({ field: "planoFinanceiroId", message: validationErrors.MSG_TRANSACAO_SEM_PLANO_FINANCEIRO });
        }

        if (!this.tipoTransacaoId) {
            errors.push({ field: "tipoTransacaoId", message: validationErrors.MSG_TRANSACAO_SEM_TIPO });
        }
    };
}