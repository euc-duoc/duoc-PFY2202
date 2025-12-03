function accederListadoProcesos() {
    cy.get('.side-menu > ul')
        .children('li')
        .contains('Procesos registrados')
        .click()
        .wait(3000);
}

describe('Pruebas de app. procesos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('Abre listado procesos y cuenta resultados', () => {
        accederListadoProcesos();

        cy.get('tbody')
            .children('tr')
            .should('have.length', 3);
    });

    it('Abre un proceso, lo edita y corrobora resultado', () => {
        accederListadoProcesos();

        cy.get('tbody')
            .children('tr').eq(0)
            .children('td').eq(4)
            .children('a')
            .click()
            .wait(3000)
            .get('input')
            .type('{selectAll}')
            .type('Nueva descripción')
            .get('button')
            .click()
            .wait(5000)
            .get('tbody')
            .children('tr').eq(0)
            .children('td').eq(2)
            .should('contain', 'Nueva descripción');
    });
})