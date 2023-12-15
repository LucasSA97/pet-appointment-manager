// deberiamos importar las functions que queramos testear

function suma( a, b ) {
    return a + b
}

describe('Testing a suma', () => {
    test('Suma de 20 y 30', () => { 
        expect (suma(20, 30 ) ).toBe(50)
     })
})