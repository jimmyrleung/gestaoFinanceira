const validationErrors = require("../../helpers/constants").errorMsgs;
const numerics = require("../../helpers/constants").numerics;
const errorTypes = require("../../helpers/constants").errorTypes;
const StringValidator = require("../../helpers/StringValidator");

module.exports = class PlanoFinanceiro {
    constructor(id, nome, isDefault) {
        this.id = id || null;
        this.nome = nome;
        this.isDefault = isDefault;
    }

    validar() {
        const error = this.validarNome();
        return error;
    }

    validarNome() {
        let errors = [];
        
        const stringValidator = new StringValidator({
            stringToValidate: this.nome,
            shouldValidateMaxLength: true,
            maxLength: numerics.NOME_PLANO_FINANCEIRO_MAX_LENGTH,
            shouldValidateMinLength: false,
            verbose: true,
            shouldValidateEmptyString: true,
            shouldTestRegex: false,
        });

        const validation = stringValidator.validate();
        if (validation.isValid) return errors

        if (validation.errorType === errorTypes.EMPTY_VALUE_ERROR) {
            errors.push({ field: "nome", message: validationErrors.MSG_PLANO_FINANCEIRO_NOME_NAO_DEFINIDO });
        }
        else if (validation.errorType === errorTypes.WRONG_TYPE_ERROR) {
            errors.push({ field: "nome", message: validationErrors.MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO });
        }
        else if (validation.errorType === errorTypes.STRING_MAX_LENGTH_ERROR) {
            errors.push({ field: "nome", message: validationErrors.MSG_PLANO_FINANCEIRO_NOME_MAX_LENGTH_EXCEDIDO });
        }

        return errors;
    }
}