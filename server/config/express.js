let express = require("express")();
let bodyParser = require("body-parser");
let helmet = require("helmet");
let consign = require("consign");

express.use(helmet());
express.use(bodyParser.json());

express.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

consign({ cwd: 'server' })
    .include('services')
    .then('controllers')
    .then('routes')
    .into(express);

module.exports = express;