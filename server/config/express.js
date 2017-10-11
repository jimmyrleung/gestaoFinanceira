let express = require("express")();
let bodyParser = require("body-parser");
let helmet = require("helmet");
let consign = require("consign");

express.use(helmet());
express.use(bodyParser.json());

consign({ cwd: 'server' })
    .include('daos')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(express);

module.exports = express;