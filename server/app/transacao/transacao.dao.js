let BaseDAO = require("../base.dao");

module.exports = class TransacaoDAO extends BaseDAO {
    constructor(SequelizeModel) {
        super(SequelizeModel);
    };
}