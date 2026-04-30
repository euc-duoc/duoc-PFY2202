describe('Prueba de flujo - sistema de venta de discos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('Ve detalle de un disco, cambia su stock y valida el cambio', () => {
        cy.wait(3000)
            .get("main")
            .children('div').eq(1) // Me posiciono en el contenedor de la página
            .children('div')
            .children('div').eq(2) // Me posiciono en la 3era tarjeta de disco
            .children('button').click() // Doy click al botón para navegar hacia el detalle del disco
            .wait(4000)
            .get("input") // Busco el único input (texto) de la página cargada
            .type('{selectAll}') // Selecciono todo el texto del input
            .type('1')
            .get("input")
            .type("{moveToEnd}")
            .type('0')
            .get("input")
            .type("{moveToEnd}")
            .type('0') // ingreso 100 como nuevo stock            
            .get("button") // busco el único botón de la página
            .click() // doy click al botón
            .wait(4000)
            .get("main")
            .children('div').eq(1) // Me posiciono en el contenedor de la página
            .children('div')
            .children('div').eq(2) // Me posiciono en la 3era tarjeta de disco
            .children('p').eq(2) // Me posiciono en el 3er párrafo de la tarjeta
            .should('contain', '100 disponible(s)'); // Compruebo que el stock es 100
    });
})