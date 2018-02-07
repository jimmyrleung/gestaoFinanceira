let express = require('./server/config/express');
let systemMessages = require("./server/helpers/constants").sysMsgs;

express.listen(3002, () => {
    console.log(systemMessages.MSG_SERVER_STARTED);
});