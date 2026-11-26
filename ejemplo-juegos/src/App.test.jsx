import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('carga el catálogo REST y muestra la ficha GraphQL al seleccionar un juego', async () => {
    const user = userEvent.setup()

    window.history.replaceState(null, '', '/juegos')
    render(<App />)

    const enlace = await screen.findByRole(
        'link',
        { name: 'Carcassonne' },
        { timeout: 4000 }
    )

    await user.click(enlace)

    expect(await screen.findByRole('heading', { name: 'Carcassonne' }))
        .toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Portada de Carcassonne' }))
        .toHaveAttribute('src', '/img/juego-carcassonne.jpg')
    expect(screen.getByText(/Jugadores:\s*2 a 5/)).toBeInTheDocument()
})