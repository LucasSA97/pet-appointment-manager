import Citas from "../classes/citas";

describe("Probar la clase Citas", () => {
    const citas = new Citas
    const id = Date.now()

    test('Agregar una nueva cita ', () => { 
        const citaObjeto = {
            id,
            mascota: 'Poli',
            propietario: 'Lucas',
            telefono: '3241315',
            fecha: '02/10/2023',
            hora: '10:30',
            sintomas: 'Solo duerme'
        } 

        citas.agregarCita(citaObjeto)
        expect(citas).toMatchSnapshot()
     })

     test('Actualizar cita', () => {
        const citaActualizada = {
            mascota: 'Ema',
            id,
            propietario: 'Lucas',
            telefono: '3241315',
            fecha: '02/10/2023',
            hora: '10:30',
            sintomas: 'Solo come'
        } 
        citas.editarCita(citaActualizada);
        expect(citas).toMatchSnapshot()
     })

     test('Eliminar cita', () => {
 
        citas.eliminarCita(id);
        expect(citas).toMatchSnapshot()
     })
})