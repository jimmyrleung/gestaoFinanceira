const fs = require("fs");
const path = require("path");


module.exports = function (express) {
    let routeFiles = getRoutesFromDirectory(__dirname);

    routeFiles.forEach((route) => {
        require(route)(express);
    });
};

function getRoutesFromDirectory(directory) {
    let routes = [];
    let routeFilesRegex = /.*route\.js$/;
    let dirOrFileFullPath = "";

    // Le o conteúdo do diretório
    let directoryContent = fs.readdirSync(directory);

    directoryContent.forEach((dirOrFile) => {
        // Se não usar a linha abaixo irá buscar da raíz
        dirOrFileFullPath = path.join(directory, dirOrFile);

        // Se for um diretório busca arquivos '*route.js' nesse diretório
        if (fs.lstatSync(dirOrFileFullPath).isDirectory()) {
            routes = routes.concat(getRoutesFromDirectory(dirOrFileFullPath));
        }
        else {
            if (routeFilesRegex.test(dirOrFileFullPath)) routes = routes.concat(dirOrFileFullPath);
        }
    });

    return routes;
}