import Citas from "./classes/citas.js"
import UserInterface from "./classes/ui.js"

import { 
    dateInput,
    hourInput,
    petInput,
    ownerInput,
    petSymptomsInput,
    phoneNumberInput,
    form 
} from './selectors.js'

const adminCitas = new Citas()
const ui = new UserInterface()

let editandoCita = false

const citaObjeto = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
    //Agrega datos al objeto de cita
export function datosCita(e) {
    citaObjeto[e.target.name] = e.target.value
}

    //Valid y agrega una nueva cita a la clase de citas
 export function nuevaCita(e) {
        e.preventDefault()
    
        //Extraemos la informacion
        const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObjeto
    
        //Validamos
        if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
            ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
            return;
        }
    
        if(editandoCita) {
            ui.imprimirAlerta('Editado correctamente')
    
            adminCitas.editarCita({...citaObjeto})
    
            form.querySelector('button[type="submit"]').textContent = "Crear Cita";
            
            editandoCita = false
    
        } else {
    
            //Generamos id unico para cada cita
            citaObjeto.id = Date.now()
    
            //Creamos nueva cita
            adminCitas.agregarCita({...citaObjeto})
    
            ui.imprimirAlerta('Se agrego correctamente')
        }
    
    
    
        //Reiniciamos el objeto para la validacion
        reiniciarObjeto()
    
        //Reiniciamos el formulario
        form.reset()
    
        //Mostrar el HTML de las citas
         ui.imprimirCitas(adminCitas)
    
    }
    
    export function reiniciarObjeto() {
        citaObjeto.mascota = ''
        citaObjeto.propietario = ''
        citaObjeto.telefono = ''
        citaObjeto.fecha = ''
        citaObjeto.hora = ''
        citaObjeto.sintomas = ''
    }
    
    export function eliminarCita (id) {
        adminCitas.eliminarCita(id)
    
        //Mostramos mensaje
        ui.imprimirAlerta('Se elimino la cita')
    
        //Refrescamos las citas
        ui.imprimirCitas(adminCitas)
    }
    
    //Cargamos los datos y la edicion
    export function cargarEdicion(cita) {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita
    
        petInput.value = mascota
        ownerInput.value = propietario
        phoneNumberInput.value = telefono
        dateInput.value = fecha
        hourInput.value = hora
        petSymptomsInput.value = sintomas
    
        //Volver a llenar el objeto
        citaObjeto.mascota = mascota
        citaObjeto.propietario = propietario
        citaObjeto.telefono = telefono
        citaObjeto.fecha = fecha
        citaObjeto.hora = hora
        citaObjeto.sintomas = sintomas
        citaObjeto.id = id
    
        //Cambiamos el texto del boton
        form.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
    
        editandoCita = true
    
    }