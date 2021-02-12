
require('colors');

const { guardarDB, leerDB} = require('./helpers/guardarArchivo');
const { inquirerMenu,
            pausa,
         leerInput,
         listadoTareaBorrar,
        confirm,
        mostrarListadoCeckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


console.clear();

const main = async () => {

    tareas = new Tareas();
    let opt= '';

    const tareasDB = leerDB();

    if (tareasDB) {// establecer tarea
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // imprime el menu
        opt = await  inquirerMenu();
        
        switch (opt) {
            case '1':
                // crear option
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
               // listadoCompleto
               tareas.listadoCompleto();
            break;

            case '3':// istar pendientes
                
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':// listar pendientes

                tareas.listarPendientesCompletadas(false);

            break;

            case '5': // completado o pendiente
                
                const ids = await mostrarListadoCeckList(tareas.listadoArr);
                tareas.toggleCompleted(ids);

            break;


            case '6': // borrar
                const id = await listadoTareaBorrar( tareas.listadoArr );
                
                if (id !== '0') {
                    const ok = await confirm('¿Estas Seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente...'.green);
                    }else console.log('\n No se borro la tarea'.red);    
                }
                
            break;
        }
        
        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
}

main();