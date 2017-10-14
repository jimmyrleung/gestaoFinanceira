module.exports = class BaseDAO {
    constructor(SequelizeModel) {
        this.SequelizeModel = SequelizeModel;
    }

    create(object) {
        return this.SequelizeModel.create(object);
    };

    updateById(id, object, fields) {
        return this.SequelizeModel.update(object, { fields: fields, where: { id: id } });
    };

    updateQuery(object, queryObject) {
        return this.SequelizeModel.update(object, queryObject);
    };

    deleteById(id) {
        return this.SequelizeModel.destroy({ where: { id: id } });
    };

    deleteQuery(queryObject) {
        return this.this.SequelizeModel.destroy(queryObject);
    };

    findOneById(id) {
        return this.SequelizeModel.find({ where: { id: id } });
    };

    findOneQuery(queryObject) {
        return this.SequelizeModel.find(queryObject);
    };

    findManyQuery(queryObject) {
        return this.SequelizeModel.findAll(queryObject);
    };
}