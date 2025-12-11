import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { MockedProvider } from '@apollo/client/testing/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { gql } from '@apollo/client';
import Catalogo from './Catalogo';
import { delay } from 'msw';

const GQL_OBTENER_DISCOS = gql`
  query ObtenerDiscos {
    discos {
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
        query: GQL_OBTENER_DISCOS
    },
    result: {
        data: {
            discos: [
                {
                    id: 2,
                    img: "img/cover-01.jpg",
                    nombreGrupo: "Grupo 1",
                    nombreDisco: "Disco 1",
                    stock: 10
                },
                {
                    id: 4,
                    img: "img/cover-02.jpg",
                    nombreGrupo: "Grupo 2",
                    nombreDisco: "Disco 2",
                    stock: 2
                }
            ]
        }
    }
}];

const renderWithRoutes = (path) => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/" element={<Catalogo />}/>
                </Routes>                        
            </MemoryRouter>
        </MockedProvider>
    );
};

describe('Prueba de la página "Catalogo":',() => {
    it('Prueba general de componente', async () => {
        renderWithRoutes('/');
        await delay(2000);
        screen.getByText('Grupo 1');
        screen.getByText('Grupo 2');
        screen.getByText("10 disponible(s)");
    });
});