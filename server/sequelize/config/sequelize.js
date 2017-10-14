'use strict';
let Sequelize = require("sequelize"),
    dbConfig = require('../../config/config').DATABASE_CONFIG;

// Cria um objeto do Sequelize com as configurações do nosso banco
let sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.passwd,
    dbConfig.dbOptions);

// Estabelece a conexão com o banco
sequelize
    .authenticate()
    .then(function () {
        console.log("Conexão com o banco de dados bem-sucedida.");
    })
    .catch(function (err) {
        console.log("Erro ao conectar com o banco de dados: " + err);
    });

module.exports = sequelize;