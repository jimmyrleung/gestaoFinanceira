/**
 * Numerics (Valores, quantidades, length, etc)
 */
let numerics = {
    SYSTEM_DEFAULT_PORT: 3001,
    NOME_PLANO_FINANCEIRO_MAX_LENGTH: 30,
    DESCR_TRANSACAO_MAX_LENGTH: 100
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
    MSG_PLANO_FINANCEIRO_NOME_MAX_LENGTH_EXCEDIDO: `O nome do plano financeiro deve ter no máximo ${numerics.NOME_PLANO_FINANCEIRO_MAX_LENGTH} caractéres.`,

    MSG_TRANSACAO_DESCRICAO_NAO_DEFINIDA: "É obrigatório definir uma descrição para essa transação.",
    MSG_TRANSACAO_DESCRICAO_FORMATO_INVALIDO: "A descrição da transação deve ser um texto válido.",
    MSG_TRANSACAO_DESCRICAO_MAX_LENGTH_EXCEDIDO: `A descrição da transação deve ter no máximo ${numerics.DESCR_TRANSACAO_MAX_LENGTH} caractéres.`,

    MSG_TRANSACAO_DATA_NAO_INFORMADA: "É obrigatório informar uma data para essa transação.",
    MSG_TRANSACAO_DATA_FORMATO_INVALIDO: "A data da transação deve ser uma data válida.",

    MSG_TRANSACAO_VALOR_NAO_INFORMADO: "É obrigatório informar um valor para essa transação.",
    MSG_TRANSACAO_VALOR_FORMATO_INVALIDO: "O valor da transação deve ser um valor válido e deve estar no formato ############,##.",
    MSG_TRANSACAO_VALOR_ZERO_OU_NEGATIVO: "O valor deve ser positivo e maior que zero.",
    MSG_TRANSACAO_SEM_PLANO_FINANCEIRO: "A transação deve estar vinculada a um plano financeiro.",
    MSG_TRANSACAO_SEM_TIPO: "A transação deve ter um tipo definido."
};
module.exports.errorMsgs = errorMsgs;







