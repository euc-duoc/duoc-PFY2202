import { useState, useEffect } from 'react'
import "./Juegos.css"
import Cargando from '../Cargando'
import TarjetaJuego from '../TarjetaJuego'

function Juegos({ juegos, setJuegos }) {
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const obtenerJuegos = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000))
                const response = await fetch("https://dummyjson.com/c/b6c3-f1f3-4589-a186")

                if (!response.ok)
                    throw new Error()

                const data = await response.json()
                setJuegos(data)

            } 
            catch (error) {
                setError(true)
            } 
            finally {
                setCargando(false)
            }
        }

        obtenerJuegos()
    }, [])

    return <main className="contenido">
        <div className="subtitle">Listado de juegos</div>
            
        {error ? 
        
            (<div style={{ color: "red", fontWeight: "bolder" }}>                        
            <img style={{ width: "30px" }} src="./img/warning.png"/>&nbsp;
                No se pudieron cargar los datos de los juegos.
            </div>)

            :

            (cargando ? (
                <Cargando />
            ) : (<>
                <div className="juegos-cont">
                    {juegos.map(juego => (
                        // TODO: transformar tarjeta en componente
                        <TarjetaJuego key={juego.id} juego={juego} />
                    ))}
                </div>
                <div style={{ textAlign: "left" }}>
                    <button className="btn btn-primary">Mostrar carrito</button>
                </div>
            </>)            
        )}
    </main>  
}

export default Juegos
