module.exports = class TipoTransacao {
    constructor(id, descricao) {
        this.id = id || null;
        this.descricao = descricao || "";
    }

    validar() {
        let errors = this.validarNome(this.descricao);
        return errors;
    }

    validarDescricao(descricao) {
        let errors = [];

        if (!descricao) {
            errors.push({ field: "descricao", message: "É obrigatório definir uma descrição para o tipo de transação." });
        }
        else if (typeof descricao !== "string") {
            errors.push({ field: "descricao", message: "A descrição deve ser um texto válido." });
        }
        else if (descricao.length > 50) {
            errors.push({ field: "descricao", message: "A descrição deve ter no máximo 50 caractéres." });
        }

        return errors;
    }
}