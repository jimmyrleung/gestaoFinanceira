let BaseDAO = require("./base");

module.exports = class PlanoFinanceiroDAO extends BaseDAO {
    constructor(SequelizeModel) {
        super(SequelizeModel);
    };
}