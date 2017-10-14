'use strict';
// Mensagem personalizada para retornar também http status code

module.exports = function CustomError(message, code, errorList) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.code = (code) ? code : 500;
    this.errorList = (errorList) ? errorList : [];
}