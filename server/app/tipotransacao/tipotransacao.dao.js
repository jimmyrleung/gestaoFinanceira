let BaseDAO = require("../base.dao");

module.exports = class TipoTransacaoDAO extends BaseDAO {
    constructor(SequelizeModel) {
        super(SequelizeModel);
    };
}