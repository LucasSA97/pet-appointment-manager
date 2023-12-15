const cliente = {
    nombre: 'Lucas',
    balance: 50,
    tipo: 'Normal'
}

describe('Test al cliente', () => {
    test('Es Lucas', () => { 
        expect(cliente).toMatchSnapshot()
     })
})

//npm t -- -u Actualizará el snapshot