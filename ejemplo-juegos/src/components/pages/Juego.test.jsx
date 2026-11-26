import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Juego from './Juego'

test('muestra un aviso cuando GraphQL devuelve un juego inexistente', async () => {
    render(
        <MemoryRouter initialEntries={['/juego/999']}>
            <Routes>
                <Route path="/juego/:id" element={<Juego />} />
            </Routes>
        </MemoryRouter>
    )

    expect(await screen.findByText('Juego no encontrado.'))
        .toBeInTheDocument()
})