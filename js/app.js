const petInput = document.querySelector('#mascota')
const ownerInput = document.querySelector('#propietario')
const phoneNumberInput = document.querySelector('#telefono')
const dateInput = document.querySelector('#fecha')
const hourInput = document.querySelector('#hora')
const petSymptomsInput = document.querySelector('#sintomas')

const form = document.querySelector('#nueva-cita')

const contenedorCitas = document.querySelector('#citas')


class Citas {
    constructor() {
        this.citas = []
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }
}

class UserInterface {

    imprimirAlerta(mensaje, tipo) {
        //Creamos el div
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')

        // Agregamos la clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }

        //Mensaje de error:
        divMensaje.textContent = mensaje;

        //Agregamos al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

        setTimeout( () => {
            divMensaje.remove()
        },3000)
    }

    imprimirCitas({citas}) {

        this.limpiarHTML()

        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3')
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2')
                    mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                    mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement('p')
                     propietarioParrafo.innerHTML = `
                     <span class='font-weight-bolder'>Propietario: </span> ${propietario}`
                    

            const telefonoParrafo = document.createElement('p')
                    telefonoParrafo.innerHTML = `
                    <span class='font-weight-bolder'>Telefono: </span> ${telefono}`
                    
            const fechaParrafo = document.createElement('p')
                    fechaParrafo.innerHTML = `
                    <span class='font-weight-bolder'>Fecha: </span> ${fecha}`

            const horaParrafo = document.createElement('p')
                    horaParrafo.innerHTML = `
                    <span class='font-weight-bolder'>Hora: </span> ${hora}`

            const sintomasParrafo = document.createElement('p')
                    sintomasParrafo.innerHTML = `
                    <span class='font-weight-bolder'>Sintomas: </span> ${sintomas}`


            //Agregar al divCita
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoParrafo)
            divCita.appendChild(fechaParrafo)
            divCita.appendChild(horaParrafo)
            divCita.appendChild(sintomasParrafo)
            
            contenedorCitas.appendChild(divCita)
        } )
        
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild )
        }
    }

}

const adminCitas = new Citas()
const ui = new UserInterface()

eventListeners()
function eventListeners() {
    petInput.addEventListener('input', datosCita)
    ownerInput.addEventListener('input', datosCita)
    phoneNumberInput.addEventListener('input', datosCita)
    dateInput.addEventListener('input', datosCita)
    hourInput.addEventListener('input', datosCita)
    petSymptomsInput.addEventListener('input', datosCita)

    form.addEventListener('submit', nuevaCita)
}

const citaObjeto = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}
    //Agrega datos al objeto de cita
function datosCita(e) {
    citaObjeto[e.target.name] = e.target.value
}

    //Valid y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault()

    //Extraemos la informacion
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObjeto

    //Validamos
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

    //Generamos id unico para cada cita
    citaObjeto.id = Date.now()

    //Creamos nueva cita
    adminCitas.agregarCita({...citaObjeto})

    //Reiniciamos el objeto para la validacion
    reiniciarObjeto()

    //Reiniciamos el formulario
    form.reset()

    //Mostrar el HTML de las citas
     ui.imprimirCitas(adminCitas)

}

function reiniciarObjeto() {
    citaObjeto.mascota = ''
    citaObjeto.propietario = ''
    citaObjeto.telefono = ''
    citaObjeto.fecha = ''
    citaObjeto.hora = ''
    citaObjeto.sintomas = ''
}