let Transacao = require("./Transacao");
let handleError = require("../../helpers/handleError");
let transacaoServices = require("./transacao.services");

module.exports = {
    create: function (req, res) {
        // TODO: Criar nova transacao passando os parâmetros corretos
        transacaoServices.create(new Transacao())
            .then(() => res.status(200).json())
            .catch(error => handleError(error, res));
    },

    getAll: function (req, res) {
        transacaoServices.getAll()
            .then(transacoes => res.status(200).json(transacoes))
            .catch(error => handleError(error, res));
    },

    update: function (req, res) {
        // TODO: Criar nova transacao passando os parâmetros corretos
        transacaoServices.update(new Transacao())
            .then(() => res.status(200).json())
            .catch(error => handleError(error, res));
    }
}