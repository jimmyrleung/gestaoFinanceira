module.exports = class PlanoFinanceiro {
    constructor(nome) {
        this.id = null;
        this.nome = nome;
    }

    validar() {
        let error = this.validarNome(this.nome);
        return error;
    }

    validarNome(nomePlanoFinanceiro) {
        let errors = [];

        if (!nomePlanoFinanceiro) {
            errors.push({ field: "nomePlanoFinanceiro", message: "É obrigatório definir um nome para o plano financeiro." });
        }
        else if (typeof nomePlanoFinanceiro !== "string") {
            errors.push({ field: "nomePlanoFinanceiro", message: "O nome do plano financeiro deve ser um texto válido." });
        }
        else if (nomePlanoFinanceiro.length > 30) {
            errors.push({ field: "nomePlanoFinanceiro", message: "O nome do plano financeiro deve ter no máximo 30 caractéres." });
        }

        return errors;
    }
}