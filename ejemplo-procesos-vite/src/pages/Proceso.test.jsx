import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Proceso from "./Proceso";
import { MockedProvider } from '@apollo/client/testing/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { gql } from "@apollo/client";
import { delay } from "msw";

const GQL_OBTENER_PROCESO = gql`
    query ObtenerProceso($id: Int!) {
        proceso(id: $id) {
        nombre
        desc
        tipo
        }
    }`;

const mocks = [{
    request: {
        query: GQL_OBTENER_PROCESO,
        variables: { id: "1" }
    },
    result: {
        data: {
            proceso: {
                id: 1, nombre: "Proceso test",
                desc: "Test test test.",
                tipo: "Misional"
            }
        }
    }
}];

const renderWithRoutes = (path) => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/proceso/:id" element={<Proceso />}/>
                </Routes>                        
            </MemoryRouter>
        </MockedProvider>
    );
};

describe('Proceso test:',() => {
    it('Prueba general de componente', async () => {
        renderWithRoutes('/proceso/1');
        await delay(3000);
        screen.getByText('Proceso: Proceso test');
    });
});