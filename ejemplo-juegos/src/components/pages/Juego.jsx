import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cargando from '../Cargando'

const OBTENER_JUEGO = `
    query ObtenerJuego($id: Int!) {
        juego(id: $id) {
            nombre
            precio
            img
            jugadores
        }
    }
`

function Juego() {
    const { id } = useParams()
    return <DetalleJuego key={id} id={Number(id)} />
}

function DetalleJuego({ id }) {
    const [juego, setJuego] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controlador = new AbortController()

        async function obtenerJuego() {
            try {
                const respuesta = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: OBTENER_JUEGO,
                        variables: { id }
                    }),
                    signal: controlador.signal
                })

                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la ficha del juego.')
                }

                const resultado = await respuesta.json()

                if (resultado.errors?.length) {
                    throw new Error(resultado.errors[0].message)
                }

                setJuego(resultado.data.juego)
            } catch (error) {
                if (!controlador.signal.aborted) {
                    setError(error.message)
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false)
                }
            }
        }

        obtenerJuego()

        return () => controlador.abort()
    }, [id])

    return (
        <main className="contenido">
            {cargando ? (
                <Cargando />
            ) : error ? (
                <p role="alert">{error}</p>
            ) : juego ? (
                <>
                    <h1 className="subtitle">{juego.nombre}</h1>
                    <img
                        src={juego.img}
                        alt={`Portada de ${juego.nombre}`}
                        className="img-fluid d-block mx-auto mb-3"
                        style={{ width: '260px' }}
                    />
                    <p>Precio: ${juego.precio.toLocaleString('es-CL')}</p>
                    <p>Jugadores: {juego.jugadoresPorJuego}</p>
                </>
            ) : (
                <p>Juego no encontrado.</p>
            )}
        </main>
    )
}

export default Juego
