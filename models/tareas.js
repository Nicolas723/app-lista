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

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        this.guardarTareas();
    }

    listarTareas() {
        console.log('Tareas existentes:');
        this.listadoArr.forEach((tarea, index) => {
            const estado = tarea.completadoEn ? 'Completada' : 'Incompleta';
            console.log(`${index + 1}. ${tarea.desc} - Estado: ${estado}`);
        });
    }

    marcarTareasCompletas(ids) {
        ids.forEach(id => {
            if (this._listado[id]) {
                this._listado[id].completadoEn = new Date().toISOString();
            }
        });
        this.guardarTareas();
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
        const tareasIncompletas = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        if (tareasIncompletas.length === 0) {
            console.log('No hay tareas incompletas para completar.');
        } else {
            const idsCompletar = await leerInput('Ingrese el número de la tarea que desea completar: ');
            const indexCompletar = parseInt(idsCompletar) - 1;
            if (indexCompletar >= 0 && indexCompletar < tareasIncompletas.length) {
                const tareaACompletar = tareasIncompletas[indexCompletar];
                tareaACompletar.completadoEn = new Date().toISOString();
                console.log(`La tarea "${tareaACompletar.desc}" se ha marcado como completada.`);
                this.guardarTareas();
            } else {
                console.log('Número de tarea no válido.');
            }
        }
    }

    async borrarTarea() {
        this.listarTareas();
        const numeroBorrar = await leerInput('Ingrese el número de la tarea que desea eliminar: ');

        const index = parseInt(numeroBorrar) - 1;
        if (index >= 0 && index < this.listadoArr.length) {
            const tareaAEliminar = this.listadoArr[index];
            console.log(`Tarea eliminada: ${tareaAEliminar.desc}`);
        } else {
            console.log('Número de tarea no válido.');
        }
        this.guardarTareas();
    }



    guardarTareas() {
        guardarDB(Object.values(this._listado));
    }

}

module.exports = Tareas;
