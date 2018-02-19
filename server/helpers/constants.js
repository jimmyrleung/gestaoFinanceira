/**
 * Numerics (Valores, quantidades, length, etc)
 */
let numerics = {
    SYSTEM_DEFAULT_PORT: 3001,
    NOME_PLANO_FINANCEIRO_MAX_LENGTH: 30
};
module.exports.numerics = numerics;

/**
 * Mensagens internas do sistema
 */
let sysMsg = {
    MSG_SERVER_STARTED: `Servidor rodando na porta ${numerics.SYSTEM_DEFAULT_PORT}...`
};
module.exports.sysMsgs = sysMsg;

/**
 * Mensagens de erro
 */
let errorMsgs = {
    MSG_INTERNAL_SERVER_ERROR: "Erro interno no servidor. Tente novamente mais tarde.",
    MSG_VALIDATION_ERRORS: "Existem campos com formato inválido.",
    MSG_PLANO_FINANCEIRO_JA_CADASTRADO: "Já existe um plano financeiro com este nome.",
    MSG_PLANO_FINANCEIRO_NOME_NAO_DEFINIDO: "É obrigatório definir um nome para o plano financeiro.",
    MSG_PLANO_FINANCEIRO_NOME_FORMATO_INVALIDO: "O nome do plano financeiro deve ser um texto válido.",
    MSG_PLANO_FINANCEIRO_NOME_MAX_LENGTH_EXCEDIDO: `O nome do plano financeiro deve ter no máximo ${numerics.NOME_PLANO_FINANCEIRO_MAX_LENGTH} caractéres.`
};
module.exports.errorMsgs = errorMsgs;







