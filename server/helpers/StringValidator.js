let errorTypes = require("./constants").errorTypes;

module.exports = class StringValidator {
    constructor(stringToValidate, shouldValidateMaxLength, maxLength, shouldValidateMinLength, minLength, 
        verbose, shouldValidateEmptyString, shouldTestRegex, regex) {

        this.stringToValidate = stringToValidate || "";
        this.shouldValidateMaxLength = shouldValidateMaxLength || false;
        this.maxLength = maxLength || 255;
        this.shouldValidateMinLength = shouldValidateMinLength || false;
        this.minLength = minLength || 3;
        this.verbose = verbose|| false;
        this.shouldValidateEmptyString = shouldValidateEmptyString|| false;
        this.shouldTestRegex = shouldTestRegex || false;
        this.regex = regex || null;
    
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
        else if (this.shouldValidateMinLength && this.minLength < this.minLength) {
            return (this.verbose) ? 
                { isValid: false, errorType: errorTypes.STRING_MIN_LENGTH_ERROR } : false;
        }

        return (this.verbose) ? { isValid: true }: true;
    };
}