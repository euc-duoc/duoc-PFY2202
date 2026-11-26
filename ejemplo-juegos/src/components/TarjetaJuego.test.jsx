import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TarjetaJuego from './TarjetaJuego'

test('al comprar un juego, la tarjeta muestra En Carrito', async () => {
    const user = userEvent.setup()
    const juego = {
        id: 4,
        nombre: 'Carcassonne',
        precio: 22990,
        img: '/img/juego-carcassonne.jpg'
    }

    render(
        <MemoryRouter>
            <TarjetaJuego juego={juego} />
        </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Carcassonne' }))
        .toHaveAttribute('href', '/juego/4')

    await user.click(screen.getByRole('link', { name: 'Comprar' }))

    expect(screen.getByRole('link', { name: 'En Carrito' }))
        .toBeInTheDocument()
})