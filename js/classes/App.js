import { datosCita, nuevaCita } from "../functions.js"
import { 
    dateInput,
    hourInput,
    petInput,
    ownerInput,
    petSymptomsInput,
    phoneNumberInput,
    form 
} from '../selectors.js'

class App {
    constructor() {
        this.initApp()
    }

    initApp() {
        petInput.addEventListener('input', datosCita)
        ownerInput.addEventListener('input', datosCita)
        phoneNumberInput.addEventListener('input', datosCita)
        dateInput.addEventListener('input', datosCita)
        hourInput.addEventListener('input', datosCita)
        petSymptomsInput.addEventListener('input', datosCita)

        form.addEventListener('submit', nuevaCita)

    }
}

export default App;