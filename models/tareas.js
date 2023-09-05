const Tarea = require('./tarea');
const { guardarDB, cargarDB } = require('../helpers/guardarArchivo');
const { leerInput } = require('../helpers/inquirer');

class Tareas {

    get listadoArr() {
        return Object.values(this._listado);
    }

    constructor() {
        this._listado = {};
        this.cargarTareas();
    }

    cargarTareas() {
        const tareasGuardadas = cargarDB();
        tareasGuardadas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    async crearTareas() {
        const tareasNuevas = [];
        console.log('Ingrese la descripción de la tarea (o "EXIT" para salir): ');
        let desc = await leerInput();

        while (desc.toUpperCase() !== 'EXIT') {
            const tarea = new Tarea(desc);
            this._listado[tarea.id] = tarea;
            tareasNuevas.push(tarea);
            desc = await leerInput();
        }

        if (tareasNuevas.length > 0) {
            console.log('Tareas creadas:');
            tareasNuevas.forEach((tarea, index) => {
                console.log(`${index + 1}. ${tarea.desc}`);
            });
            this.guardarTareas();
        } else {
            console.log('No se han creado tareas.');
        }
    }

    listarTareas() {
        console.log('Tareas existentes:');
        this.listadoArr.forEach((tarea, index) => {
            const estado = tarea.completadoEn ? 'Completada' : 'Incompleta';
            console.log(`${index + 1}. ${tarea.desc} - Estado: ${estado}`);
        });
    }

    listarTareasCompletas() {
        const tareasCompletas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        console.log('Tareas completas:');
        tareasCompletas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
        });
    }


    listarTareasIncompletas() {
        const tareasIncompletas = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        console.log('Tareas incompletas:');
        tareasIncompletas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
        });
    }

    async completarTarea() {
        this.listarTareasIncompletas();
        console.log('Ingrese los números de las tareas que desea completar (separados por coma): ');
        const idsCompletar = await leerInput();
        const idsCompletarArray = idsCompletar.split(',').map(id => parseInt(id.trim()) - 1);

        const tareasIncompletas = this.listadoArr.filter(tarea => tarea.completadoEn === null);

        idsCompletarArray.forEach(indexCompletar => {
            if (indexCompletar >= 0 && indexCompletar < tareasIncompletas.length) {
                const tareaACompletar = tareasIncompletas[indexCompletar];
                tareaACompletar.completadoEn = new Date().toISOString();
                console.log(`La tarea "${tareaACompletar.desc}" se ha marcado como completada.`);
            } else {
                console.log(`Número de tarea no válido: ${indexCompletar + 1}`);
            }
        });

        this.guardarTareas();
    }

    async borrarTarea() {
        this.listarTareas();
        console.log('Ingrese los números de las tareas que desea eliminar (separados por coma): ');
        const numerosBorrar = await leerInput();
        const numerosBorrarArray = numerosBorrar.split(',').map(id => parseInt(id.trim()) - 1);

        numerosBorrarArray.forEach(index => {
            if (index >= 0 && index < this.listadoArr.length) {
                const tareaAEliminar = this.listadoArr[index];
                console.log(`Tarea eliminada: ${tareaAEliminar.desc}`);
                delete this._listado[tareaAEliminar.id];
            } else {
                console.log(`Número de tarea no válido: ${index + 1}`);
            }
        });

        this.guardarTareas();
    }



    guardarTareas() {
        guardarDB(Object.values(this._listado));
    }

}

module.exports = Tareas;
