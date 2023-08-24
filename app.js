require('colors');

const { guardarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const { mostrarMenu } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');


console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion; ');
                tareas.crearTarea(desc);

                break;

            case '2':
        }
    } while(opcion != '0');
}

main();

//terminar app
//quiz en 15 dias
//node modules