require('colors');
const inquirer = require('inquirer');
const promp = inquirer.createPromptModule();

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} ${'Añadir tarea'.yellow}`
            },
            {
                value: '2',
                name: `${'2.'.red} ${'Mostrar tareas'.yellow}`
            },
            {
                value: '3',
                name: `${'3.'.red} ${'Mostrar tareas completas'.yellow}`
            },
            {
                value: '4',
                name: `${'4.'.red} ${'Mostrar tareas incompletas'.yellow}`
            },
            {
                value: '5',
                name: `${'5.'.red} ${'Completar tarea(s)'.yellow}`
            },
            {
                value: '6',
                name: `${'6.'.red} ${'Borrar tarea(s)'.yellow}`
            },
            {
                value: '0',
                name: `${'7.'.red} ${'Salir'.yellow}`
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.log("=======================================".red);
    console.log("         SELECCIONE UNA OPCIÓN".yellow);
    console.log("=======================================".red);

    let otp = '';

    const opt = await prompt(preguntas).then(data => {
        otp = data['opcion']
    });

    return otp;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.red} to continue \n`
        }
    ]

    let pau = '';
    console.log('\n');
    await inquirer.prompt(question).then(data => {
        pau = data['message']
    });
}

const leerInput = async () => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    let leer = '';
    await inquirer.createPromptModule
}


module.exports = {
    inquirerMenu
}