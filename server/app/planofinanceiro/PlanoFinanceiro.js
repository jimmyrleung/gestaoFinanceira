let validationErrors = require("../../helpers/constants").errorMsgs;
let numerics = require("../../helpers/constants").numerics;

module.exports = class PlanoFinanceiro {
    constructor(id, nome, isDefault) {
        this.id = id || null;
        this.nome = nome;
        this.isDefault = isDefault;
    }

    validar() {
        let error = this.validarNome(this.nome);
        return error;
    }

    validarNome(nome) {
        let errors = [];

        if (!nome) {
            errors.push({ field: "nome", message: validationErrors.MSG_PLANO_FINANCEIRO_NOME_NAO_DEFINIDO });
        }
        else if (typeof nome !== "string") {
            errors.push({ field: "nome", message: validationErrors.MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO });
        }
        else if (nome.length > numerics.NOME_PLANO_FINANCEIRO_MAX_LENGTH) {
            errors.push({ field: "nome", message: validationErrors.MSG_PLANO_FINANCEIRO_NOME_MAX_LENGTH_EXCEDIDO });
        }

        return errors;
    }
}