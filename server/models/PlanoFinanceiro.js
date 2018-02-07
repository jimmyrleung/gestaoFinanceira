module.exports = class PlanoFinanceiro {
    constructor(id, nome, isDefault) {
        this.id = id || null;
        this.nome = nome;
        this.isDefault = defaultValue;
    }

    validar() {
        console.log(this.nome);
        let error = this.validarNome(this.nome);
        console.log(error);
        return error;
    }

    validarNome(nome) {
        let errors = [];

        if (!nome) {
            errors.push({ field: "nome", message: "É obrigatório definir um nome para o plano financeiro." });
        }
        else if (typeof nome !== "string") {
            errors.push({ field: "nome", message: "O nome do plano financeiro deve ser um texto válido." });
        }
        else if (nome.length > 30) {
            errors.push({ field: "nome", message: "O nome do plano financeiro deve ter no máximo 30 caractéres." });
        }

        return errors;
    }
}