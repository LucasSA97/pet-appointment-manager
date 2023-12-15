const password = '123456'

describe('Password no esta vacio y tiene 6 caracteres', () => {
    test('tiene 6 caracteres', () => { 
        expect( password ).toHaveLength(6);
     })
    test('password no vacio', () => { 
        expect( password ).not.toHaveLength(0);
     })
})