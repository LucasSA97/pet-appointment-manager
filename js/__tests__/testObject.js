const cliente = {
    nombre:'Lucas',
    balance: 500
}

describe('Test al cliente', () => {
    test('Tiene balance +', () => { 
        expect(cliente.balance).toBeGreaterThan(0)
     })
     test('Es Lucas', () => {
        expect(cliente.nombre).toBe('Lucas')
     })
})