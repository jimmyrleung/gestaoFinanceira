let errorTypes = require("./constants").errorTypes;

module.exports = class StringValidator {
    /**
     * 
     * @param {*} stringToValidate string a ser validada
     * @param {*} shouldValidateMaxLength indica se deve validar 'max length' ou não
     * @param {*} maxLength max length para a string
     * @param {*} shouldValidateMinLength indica se deve validar 'min length' ou não
     * @param {*} minLength min length para a string
     * @param {*} verbose indica que deve retornar uma saída mais elaborada ou somente um boolean
     * @param {*} shouldValidateEmptyString indica se deve validar 'required' ou não
     * @param {*} shouldTestRegex indica se deve testar uma regex
     * @param {*} regex regex a ser testada
     * 
     */
    constructor(options) {
        this.stringToValidate = options.stringToValidate || "";
        this.shouldValidateMaxLength = options.shouldValidateMaxLength || false;
        this.maxLength = options.maxLength || 255;
        this.shouldValidateMinLength = options.shouldValidateMinLength || false;
        this.minLength = options.minLength || 3;
        this.verbose = options.verbose || false;
        this.shouldValidateEmptyString = options.shouldValidateEmptyString || false;
        this.shouldTestRegex = options.shouldTestRegex || false;
        this.regex = options.regex || null;
    };

    validate() {
        if (!this.stringToValidate) {
            return (this.verbose) ?
                { isValid: false, errorType: errorTypes.EMPTY_VALUE_ERROR } : false;
        }
        else if (typeof this.stringToValidate !== "string") {
            return (this.verbose) ?
                { isValid: false, errorType: errorTypes.WRONG_TYPE_ERROR } : false;
        }
        else if (this.shouldTestRegex && !this.regex.test(this.stringToValidate)) {
            return (this.verbose) ?
                { isValid: false, errorType: errorTypes.WRONG_FORMAT_ERROR } : false;
        }
        else if (this.shouldValidateMaxLength && this.stringToValidate.length > this.maxLength) {
            return (this.verbose) ?
                { isValid: false, errorType: errorTypes.STRING_MAX_LENGTH_ERROR } : false;
        }
        else if (this.shouldValidateMinLength && this.stringToValidate.length < this.minLength) {
            return (this.verbose) ?
                { isValid: false, errorType: errorTypes.STRING_MIN_LENGTH_ERROR } : false;
        }

        return (this.verbose) ? { isValid: true } : true;
    };
}