import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import Main from "./Main";

// https://testing-library.com/docs/queries/about/#types-of-queries
// Tipos de consultas
describe('Main test:', () => {
    afterEach(cleanup);

    it('carga componente', () => {
        render(<Main />);
    });

    it('Carga título', () => {
        render(<Main />);
        screen.getByText('Inicio');
    });

    it('Tiene contenido básico', () => {
        render(<Main />);
        screen.getByText('Esta es la página inicial.');
        //screen.getByText('Esta es la página inicial');
    });
});