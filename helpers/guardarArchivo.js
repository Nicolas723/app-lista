const fs = require('fs');
const { stringify } = require('querystring');

const guardarDB = (Data) => {

    const archivo = './db/data.json';

    fs.writeFileSync(archivo, JSON-stringify(data));
}



module.exports = {
    guardarDB
}
