let errorMessages = require("./constants").errorMsgs;

module.exports = function (error, httpResponse) {
    if (!error.code) {
        error.code = 500;
        error.message = errorMessages.MSG_INTERNAL_SERVER_ERROR;
    }
    httpResponse.status(error.code).json(error);
}