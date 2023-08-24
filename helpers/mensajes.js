const { read } = require('fs');
const { stdout, stdin } = require('process');

require('colors');

const mostrarMenu = () => {
    return new Promise(resolve =>{
        console.clear();
        console.log("=======================================".red);
        console.log("         SELECCIONE UNA OPCIÓN".yellow);
        console.log("=======================================".red);
        console.log(`${'1.'.red} ${'Añadir tarea'.yellow}`);
        console.log(`${'2.'.red} ${'Mostrar tareas'.yellow}`);
        console.log(`${'3.'.red} ${'Mostrar tareas completas'.yellow}`);
        console.log(`${'4.'.red} ${'Mostrar tareas incompletas'.yellow}`);
        console.log(`${'5.'.red} ${'Completar tarea(s)'.yellow}`);
        console.log(`${'6.'.red} ${'Borrar tarea(s)'.yellow}`);
        console.log(`${'0.'.red} ${'Salir'.yellow}`);
        const readLine = require('readline').createInterface({
            input: stdin,
            output: stdout
        })

        readLine.question("Seleccione una opción: ", (opt) => {
            readLine.close;
            
            resolve(opt);
        }
        )
    })
}
module.exports = {
    mostrarMenu,
}