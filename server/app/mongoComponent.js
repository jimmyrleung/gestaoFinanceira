const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongodboptions = require("../config/config").MONGODB_OPTIONS;

let dbconnection = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongodboptions.host, function (err, client) {
            if (!err) {
                console.log("Connected successfully to server");

                const db = client.db(mongodboptions.database);

                resolve(db);
            }
            else {
                reject(err);
            }
        });
    });
}

module.exports = {
    insertDocument: function (collection, data) {
        return new Promise((resolve, reject) => {
            dbconnection()
                .then((db) => {
                    db.collection(collection).insertOne(data, function (err, res) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(res);
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    updateDocument: function (collection, queryObj, setValuesObj) {
        return new Promise((resolve, reject) => {
            dbconnection()
                .then((db) => {
                    db.collection(collection).updateOne(queryObj, setValuesObj, function (err, res) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(res);
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    findDocumentByCriteria: function (collection, criteria) {
        return new Promise((resolve, reject) => {
            dbconnection()
                .then((db) => {
                    db.collection(collection).find(criteria).toArray(function (err, docs) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(docs);
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

/* Use examples

return mongoComponent.updateDocument(
    mongodboptions.collections.planosfinanceiros,
    { id: planoFinanceiro.id },
    { $set: { nome: planoFinanceiro.nome } }
);

return mongoComponent.insertDocument(mongodboptions.collections.planosfinanceiros, planoFinanceiro);

return mongoComponent.findDocumentByCriteria(
    mongodboptions.collections.planosfinanceiros,
    { nome: "Básico" }
);

 */