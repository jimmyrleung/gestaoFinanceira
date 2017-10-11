let express = require('./server/config/express');

express.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});