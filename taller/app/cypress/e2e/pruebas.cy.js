function posicionarseEnTarjeta(pos) {
    return cy.get('main')
        .children('div').eq(1)
        .children('div')
        .children('div').eq(pos);
}

function entrarADetalleTarjeta(ref) {
    ref.children('button')
        .click()
        .wait(2000);
}

describe('Pruebas de app. discos', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('Abre app y revisa contenido de discos cargados', () => {
        let nav = posicionarseEnTarjeta(2);
        nav.children('p').eq(1)
            .should('contain', 'Dark Side');

        nav = posicionarseEnTarjeta(3);
        nav.children('p').eq(1)
            .should('contain', 'Mirage');
    });

    it('Dar click a componente', () => {
        let nav = posicionarseEnTarjeta(0);
        entrarADetalleTarjeta(nav);

        cy.get('p').eq(2)
            .should('contain', 'Machine Head');
    });

    it('Actualizar stock', () => {
        posicionarseEnTarjeta(4)
            .children('p').eq(2)
            .should('contain', '15 disponible(s)');

        let nav = posicionarseEnTarjeta(4);
        entrarADetalleTarjeta(nav);

        cy.get('input')
            .type('{selectAll}')
            .type('2');

        cy.get('button')
            .click()
            .wait(2000);

        posicionarseEnTarjeta(4)
            .children('p').eq(2)
            .should('contain', '2 disponible(s)');
    });
});