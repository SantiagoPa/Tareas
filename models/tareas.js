

const Tarea = require('./tarea');
const inquirer = require('inquirer');

//===================
// _listado:
// { 'uuid-123456789-121312-1231-2:' {id:12, desc: asada, completadoEn:12312} }
//===================

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key =>{
            
            const tarea = this._listado[key];
            listado.push(tarea);

        });

        return listado;
    }

    constructor(){
        this._listado={};
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas=[]){
        
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto (){
        
        const tarea = new Tarea();
        
        if (tarea) {

            this.listadoArr.forEach((tarea,i)=>{
                let idx = `${i+1+'.'}`.green;
                const { desc , completadoEn} = tarea;
                const estado = (completadoEn) 
                                ? 'Completado'.green : 'Pendiente'.red;
                console.log(`${idx} ${desc} :: ${estado}`);

            });
        }
    }

    listarPendientesCompletadas( completado = true ){
       
        let contador = 0;

        this.listadoArr.forEach((tarea)=>{

            const { desc , completadoEn} = tarea; 
            const estado = (completadoEn) 
                    ? 'Completado'.green : 'Pendiente'.red;

            if (completado) {
                // mostrar completaadas
                if (completadoEn) {
                    contador += 1;            
                    console.log(`${(contador+'.').green}. ${desc} :: ${completadoEn.green}`);
                }
 
            }else{

                if (!completadoEn) {
                    contador += 1;            
                    console.log(`${(contador+'.').green}. ${desc} :: ${estado}`);
                }

                }
                    
                      
               
            });

    }
    toggleCompleted(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea =>{

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.    id].completadoEn = null;
                
            }

        });
    }
}

module.exports = Tareas;    