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
        console.log('Ingrese las tareas (o "0" para salir): ');
        let desc = await leerInput();

        while (desc !== '0') {
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
        const Completar = await leerInput();
        const CompletarArray = Completar.split(',').map(id => parseInt(id.trim()) - 1);
      
        const tareasIncompletas = this.listadoArr.filter(tarea => tarea.completadoEn === null);
      
        const tareasAConfirmar = CompletarArray.map(indexCompletar => {
          if (indexCompletar >= 0 && indexCompletar < tareasIncompletas.length) {
            return tareasIncompletas[indexCompletar];
          }
          return null;
        }).filter(tarea => tarea !== null);
      
        if (tareasAConfirmar.length > 0) {
          console.log('Tareas seleccionadas:');
          tareasAConfirmar.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
          });
      
          console.log('Confirme que desea marcar las tareas seleccionadas como completadas ("s"): ');
          const confirmacion = await leerInput();
          if (confirmacion.toLowerCase() === 's') {
            tareasAConfirmar.forEach(tareaACompletar => {
              tareaACompletar.completadoEn = new Date().toISOString();
              console.log(`La tarea "${tareaACompletar.desc}" se ha marcado como completada.`);
            });
      
            this.guardarTareas();
            console.log('Tareas completadas exitosamente.');
          } else {
            console.log('No se han marcado tareas como completadas.');
          }
        } else {
          console.log('No se han seleccionado tareas para marcar como completadas.');
        }
      }

    async borrarTarea() {
        this.listarTareas();
        console.log('Ingrese los números de las tareas que desea eliminar (separados por coma): ');
        const Borrar = await leerInput();
        const TareasBorrarArray = Borrar.split(',').map(id => parseInt(id.trim()) - 1);

        const tareasAEliminar = [];

        TareasBorrarArray.forEach(indexBorrar => {
            if (indexBorrar >= 0 && indexBorrar < this.listadoArr.length) {
                const tareaAEliminar = this.listadoArr[indexBorrar];
                console.log(`Tarea marcada para eliminar: ${tareaAEliminar.desc}`);
                tareasAEliminar.push(tareaAEliminar);
            } else {
                console.log(`Número de tarea no válido: ${indexBorrar + 1}`);
            }
        });

        if (tareasAEliminar.length > 0) {
            console.log('Confirme que desea eliminar las tareas seleccionadas ("s"): ');
            const confirmacion = await leerInput();
            if (confirmacion.toLowerCase() === 's') {
                tareasAEliminar.forEach(tareaAEliminar => {
                    delete this._listado[tareaAEliminar.id];
                    console.log(`Tarea eliminada: ${tareaAEliminar.desc}`);
                });

                this.guardarTareas();
                console.log('Tareas eliminadas exitosamente.');
            } else {
                console.log('No se han eliminado tareas.');
            }
        } else {
            console.log('No se han seleccionado tareas para eliminar.');
        }
    }



    guardarTareas() {
        guardarDB(Object.values(this._listado));
    }

}

module.exports = Tareas;
