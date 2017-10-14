module.exports = {
    create: function (SequelizeModel, object) {
        return SequelizeModel.create(object);
    },

    updateById: function (SequelizeModel, id, object, fields) {
        return SequelizeModel.update(object, { fields: fields, where: { id: id } });
    },

    updateQuery: function (SequelizeModel) {
        return SequelizeModel.update(object, queryObject);
    },

    deleteById: function (SequelizeModel, id) {
        return SequelizeModel.destroy({ where: { id: id } });
    },

    deleteQuery: function (SequelizeModel, queryObject) {
        return SequelizeModel.destroy(queryObject);
    },

    findOneById: function (SequelizeModel, id) {
        return SequelizeModel.find({ where: { id: id } });
    },

    findOneQuery: function (SequelizeModel, queryObject) {
        return SequelizeModel.find(queryObject);
    },

    findManyQuery: function (SequelizeModel, queryObject) {
        return SequelizeModel.findAll(queryObject);
    }
}