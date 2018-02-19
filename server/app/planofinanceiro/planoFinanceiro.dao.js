let BaseDAO = require("../base.dao");

module.exports = class PlanoFinanceiroDAO extends BaseDAO {
    constructor(SequelizeModel) {
        super(SequelizeModel);
    };
}