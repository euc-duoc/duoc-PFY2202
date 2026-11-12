import "./Juegos.css"
import TarjetaJuego from '../TarjetaJuego'

function Juegos({ juegos }) {
    return <main className="contenido">
        <div className="subtitle">Listado de juegos</div>
            
        <div className="juegos-cont">
            {juegos.map(juego => (
                <TarjetaJuego key={juego.id} juego={juego} />
            ))}
        </div>
        <div style={{ textAlign: "left" }}>
            <button className="btn btn-primary">Mostrar carrito</button>
        </div>
    </main>  
}

export default Juegos
