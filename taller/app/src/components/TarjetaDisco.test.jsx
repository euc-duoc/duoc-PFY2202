import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import TarjetaDisco from "./TarjetaDisco";

const renderWithRoutes = (path) => {
    render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="/" element={
                    <TarjetaDisco
                        id={1}
                        img={"img/cover-04.jpg"}
                        nombreGrupo={"Test"}
                        nombreDisco={"Nombre"}
                        stock={5}
                    />}
                />
            </Routes>                        
        </MemoryRouter>
    );
};

describe('Prueba de componente "TarjetaDisco":', () => {
    afterEach(cleanup);

    it('Probar nombre del grupo', () => {
        renderWithRoutes('/');
        screen.getByText("Test");
    });

    it('Probar stock desplegado', () => {
        renderWithRoutes('/');
        screen.getByText("5 disponible(s)");
    });
});