const validationErrors = require("../../helpers/constants").errorMsgs;
const numerics = require("../../helpers/constants").numerics;
const errorTypes = require("../../helpers/constants").errorTypes;
const StringValidator = require("../../helpers/StringValidator");


module.exports = class TipoTransacao {
    constructor(id, descricao) {
        this.id = id || null;
        this.descricao = descricao;
    };

    validar() {
        const error = this.validarDescricao();
        return error;
    };

    validarDescricao() {
        let errors = [];

        const stringValidator = new StringValidator({
            stringToValidate: this.descricao,
            shouldValidateMaxLength: true,
            maxLength: numerics.DESCR_TIPO_TRANSACAO_MAX_LENGTH,
            shouldValidateMinLength: false,
            verbose: true,
            shouldValidateEmptyString: true,
            shouldTestRegex: false,
        });

        const validation = stringValidator.validate();
        if (validation.isValid) return errors;

        if (validation.errorType === errorTypes.EMPTY_VALUE_ERROR) {
            errors.push({ field: "descricao", message: validationErrors.MSG_TIPO_TRANSACAO_DESCRICAO_NAO_DEFINIDA });
        }
        else if (validation.errorType === errorTypes.WRONG_TYPE_ERROR) {
            errors.push({ field: "descricao", message: validationErrors.MSG_TIPO_TRANSACAO_DESCRICAO_FORMATO_INVALIDO });
        }
        else if (validation.errorType === errorTypes.STRING_MAX_LENGTH_ERROR) {
            errors.push({ field: "descricao", message: validationErrors.MSG_TIPO_TRANSACAO_DESCRICAO_MAX_LENGTH_EXCEDIDO });
        }

        return errors;
    };
}