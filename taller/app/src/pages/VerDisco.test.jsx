import { gql } from "@apollo/client";
import { MockedProvider } from '@apollo/client/testing/react'
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import VerDisco from "./VerDisco";
import { delay } from "msw";

const GQL_OBTENER_DISCO = gql`
  query ObtenerDisco($id: Int!) {
    disco(id: $id) {
        id
        img
        nombreGrupo
        nombreDisco
        stock
    }
  }
`;

const mocks = [{
    request: {
        query: GQL_OBTENER_DISCO,
        variables: { id: "2" }
    },
    result: {
        data: {
            disco: {
                id: 100,
                img: "./cover-01.jpg",
                nombreGrupo: "Grupo inventado",
                nombreDisco: "Disco inventado",
                stock: "5"
            }
        }
    }
}];

const renderWithRoutes = (path) => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/disco/:id" element={<VerDisco/>}/>
                </Routes>                        
            </MemoryRouter>
        </MockedProvider>
    );
};

describe('Pruebas de página "VerDisco":', () => {
    afterEach(cleanup);
    
    it('Prueba general', async () => {
        renderWithRoutes('/disco/2');
        await delay(1500);
        screen.getByText('Nombre Grupo: Grupo inventado');
    });

    it('Muestra id 100 independiente de la ruta', async () => {
        renderWithRoutes('/disco/2');
        await delay(1500);
        screen.getByText('ID: 100');
    });
});