"use strict";

// Base para todas as models do sequelize
function OptionsSequelizeModel(tableName, indexes) {
    return {
        timestamps: false,
        paranoid: true,
        underscored: false,
        freezeTableName: true,
        tableName: tableName,
        indexes: indexes
    };
}

module.exports = {
    // Exemplos:
    //
    // OPCOES_MODELO_CORPORACAO: new OptionsSequelizeModel('corporacao', []),
    //
    // OPCOES_MODELO_USUARIO: new OptionsSequelizeModel('usuario', [{
    //     unique: true, fields: ['corporacao', 'email']
    // },
    //     {
    //         unique: true, fields: ['corporacao', 'nomeUsuario']
    //     }
    // ])

    OPTIONS_MODEL_PLANO_FINANCEIRO: new OptionsSequelizeModel('PlanoFinanceiro', []),
    OPTIONS_MODEL_TIPO_PLANO_RESERVA: new OptionsSequelizeModel('TipoPlanoReserva', []),
    OPTIONS_MODEL_PLANO_RESERVA: new OptionsSequelizeModel('PlanoReserva', [])
    
};