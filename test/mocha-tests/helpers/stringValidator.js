let StringValidator = require("../../../server/helpers/StringValidator");
let expect = require('chai').expect;
let errorMsgs = require("../../../server/helpers/constants").errorMsgs;
let numerics = require("../../../server/helpers/constants").numerics;
let errorTypes = require("../../../server/helpers/constants").errorTypes;

function getStringValidatorDefault(overrideOptions) {
    const stringMaxLength = 1024;
    const stringMinLength = 3;

    const stringValidatorOptions = {
        stringToValidate: "",
        shouldValidateMaxLength: true,
        maxLength: stringMaxLength,
        shouldValidateMinLength: true,
        minLength: stringMinLength,
        verbose: false,
        shouldValidateEmptyString: true,
        shouldTestRegex: false,
        regex: null
    };

    if (overrideOptions) Object.assign(stringValidatorOptions, overrideOptions);

    return new StringValidator(stringValidatorOptions);
};

describe("Com relação ao validador 'String Validator'", () => {
    before(function (done) {
        this.timeout(3500);
        done();
    });

    describe("Com relação a validações não-verbosas", () => {
        /* Required */
        it("#deve retornar 'false' caso seja passado uma string vazia", (done) => {
            let stringValidator = getStringValidatorDefault();
            expect(stringValidator.validate()).to.be.equal(false);
            done();
        });

        /* TypeChecking */
        it("#deve retornar 'false' caso seja passado um tipo diferente de string", (done) => {
            let stringValidator = getStringValidatorDefault();
            const otherTypes = [new Date(), 12, /regex/, ['array', 'of', 'strings'], { key: 'prop' }];

            otherTypes.forEach(otherType => {
                stringValidator.stringToValidate = otherType;
                expect(stringValidator.validate()).to.be.equal(false);
            });

            done();
        });

        /* Regex */
        it("#deve retornar 'true' caso seja passado uma regex sem a flag de validação por regex ativa", (done) => {
            let stringValidator = getStringValidatorDefault();
            stringValidator.stringToValidate = "any";
            stringValidator.regex = /^regex\.com$/;
            expect(stringValidator.validate()).to.be.equal(true);

            done();
        });

        it("#deve retornar 'false' caso seja passado uma regex " +
            "com a flag de validação por regex ativa caso a string não atenda a regex", (done) => {
                let stringValidator = getStringValidatorDefault();
                stringValidator.stringToValidate = "any";
                stringValidator.shouldTestRegex = true;
                stringValidator.regex = /^regex\.com$/;
                expect(stringValidator.validate()).to.be.equal(false);

                done();
            });

        it("#deve retornar 'true' caso seja passado uma regex " +
            "com a flag de validação por regex ativa caso a string atenda a regex", (done) => {
                let stringValidator = getStringValidatorDefault();
                stringValidator.stringToValidate = "regex.com";
                stringValidator.regex = /^regex\.com$/;
                expect(stringValidator.validate()).to.be.equal(true);

                done();
            });

        /* MaxLength */
        it("#deve retornar 'true' caso a string a ser validada ultrapasse o max length definido " +
            "e a flag de validação por max length esteja inativa", (done) => {
                let stringValidator = getStringValidatorDefault();
                stringValidator.shouldValidateMaxLength = false;

                for (let i = 1; i <= stringValidator.maxLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                stringValidator.stringToValidate += "excedente";
                expect(stringValidator.validate()).to.be.equal(true);
                done();
            });

        it("#deve retornar 'false' caso a string a ser validada ultrapasse o max length definido " +
            "e a flag de validação por max length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault();

                for (let i = 1; i <= stringValidator.maxLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                stringValidator.stringToValidate += "excedente";
                expect(stringValidator.validate()).to.be.equal(false);
                done();
            });

        it("#deve retornar 'true' caso a string a ser validada não ultrapasse o max length definido" +
            "e a flag de validação por max length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault();

                for (let i = 1; i < stringValidator.maxLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                expect(stringValidator.validate()).to.be.equal(true);
                stringValidator.stringToValidate += "s";
                expect(stringValidator.validate()).to.be.equal(true);
                done();
            });

        // MinLength
        it("#deve retornar 'true' caso a string a ser validada não atinja o min length definido " +
            "e a flag de validação por min length esteja inativa", (done) => {
                let stringValidator = getStringValidatorDefault();
                stringValidator.shouldValidateMinLength = false;

                for (let i = 1; i < stringValidator.minLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                expect(stringValidator.validate()).to.be.equal(true);
                done();
            });

        it("#deve retornar 'false' caso a string a ser validada não atinja o min length definido " +
            "e a flag de validação por min length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault();

                for (let i = 1; i < stringValidator.minLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                expect(stringValidator.validate()).to.be.equal(false);
                done();
            });

        it("#deve retornar 'true' caso a string a ser validada atinja o min length definido " +
            "e a flag de validação por min length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault();

                for (let i = 1; i <= stringValidator.minLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                expect(stringValidator.validate()).to.be.equal(true);
                stringValidator.stringToValidate += "s";
                expect(stringValidator.validate()).to.be.equal(true);
                done();
            });
    });

    describe("Com relação a validações verbosas", () => {
        /* Required */
        it("#deve retornar 'false' e erro de 'empty string' caso seja passado uma string vazia", (done) => {
            let stringValidator = getStringValidatorDefault({ verbose: true });
            const validation = stringValidator.validate();

            expect(validation.isValid).to.be.equal(false);
            expect(validation.errorType).to.be.equal(errorTypes.EMPTY_VALUE_ERROR);
            done();
        });

        /* TypeChecking */
        it("#deve retornar 'false' e erro 'wrong type' caso seja passado um tipo diferente de string", (done) => {
            let stringValidator = getStringValidatorDefault({ verbose: true });
            const otherTypes = [new Date(), 12, /regex/, ['array', 'of', 'strings'], { key: 'prop' }];
            let validation = {};

            otherTypes.forEach(otherType => {
                stringValidator.stringToValidate = otherType;
                validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(false);
                expect(validation.errorType).to.be.equal(errorTypes.WRONG_TYPE_ERROR);
            });

            done();
        });

        /* Regex */
        it("#deve retornar 'true' sem nenhum tipo de erro caso seja passado uma regex " +
            "sem a flag de validação por regex ativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });
                stringValidator.stringToValidate = "any";
                stringValidator.regex = /^regex\.com$/;

                let validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);
                done();
            });

        it("#deve retornar 'false' e erro 'wrong format' caso seja passado uma regex " +
            "com a flag de validação por regex ativa e a string não atenda a regex", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });
                stringValidator.stringToValidate = "any";
                stringValidator.shouldTestRegex = true;
                stringValidator.regex = /^regex\.com$/;

                let validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(false);
                expect(validation.errorType).to.be.equal(errorTypes.WRONG_FORMAT_ERROR);

                done();
            });

        it("#deve retornar 'true' sem nenhum tipo de erro caso seja passado uma regex " +
            "com a flag de validação por regex ativa e a string atenda a regex", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });
                stringValidator.stringToValidate = "regex.com";
                stringValidator.regex = /^regex\.com$/;

                let validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);

                done();
            });

        /* MaxLength */
        it("#deve retornar 'true' sem nenhum tipo de erro caso a string a ser validada ultrapasse " +
            "o max length definido e a flag de validação por max length esteja inativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });
                stringValidator.shouldValidateMaxLength = false;

                for (let i = 1; i <= stringValidator.maxLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                stringValidator.stringToValidate += "excedente";

                let validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);
                done();
            });

        it("#deve retornar 'false' e erro de 'string max length' caso a string a ser validada ultrapasse " +
            "o max length definido e a flag de validação por max length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });

                for (let i = 1; i <= stringValidator.maxLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                stringValidator.stringToValidate += "excedente";

                let validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(false);
                expect(validation.errorType).to.be.equal(errorTypes.STRING_MAX_LENGTH_ERROR);
                done();
            });

        it("#deve retornar 'true' sem nenhum tipo de erro caso a string a ser validada não ultrapasse " +
            "o max length definido e a flag de validação por max length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });

                for (let i = 1; i < stringValidator.maxLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                let validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);

                stringValidator.stringToValidate += "s";
                validation = stringValidator.validate();
                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);

                done();
            });

        // MinLength
        it("#deve retornar 'true' sem nenhum tipo de erro caso a string a ser validada não atinja o min length definido " +
            "e a flag de validação por min length esteja inativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });
                stringValidator.shouldValidateMinLength = false;

                for (let i = 1; i < stringValidator.minLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                let validation = stringValidator.validate();

                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);
                done();
            });

        it("#deve retornar 'false' e erro de 'string min length' caso a string a ser validada não atinja o min length definido " +
            "e a flag de validação por min length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });

                for (let i = 1; i < stringValidator.minLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                let validation = stringValidator.validate();

                expect(validation.isValid).to.be.equal(false);
                expect(validation.errorType).to.be.equal(errorTypes.STRING_MIN_LENGTH_ERROR);
                done();
            });

        it("#deve retornar 'true' caso a string a ser validada atinja o min length definido " +
            "e a flag de validação por min length esteja ativa", (done) => {
                let stringValidator = getStringValidatorDefault({ verbose: true });

                for (let i = 1; i <= stringValidator.minLength; i++) {
                    stringValidator.stringToValidate += "s";
                };

                let validation = stringValidator.validate();

                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);

                stringValidator.stringToValidate += "s";
                validation = stringValidator.validate();

                expect(validation.isValid).to.be.equal(true);
                expect(validation.errorType).to.be.equal(undefined);
                done();
            });
    });

});
