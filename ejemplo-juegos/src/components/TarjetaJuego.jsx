import { useState } from "react"
import { Link } from 'react-router-dom'

function TarjetaJuego({juego}) {
    const [enCarrito, setEnCarrito] = useState(false)

    return <div className="card m-3">
        <img src={juego.img} className="card-img-top"/>
        <div className="card-body">            
            <h5 className="card-title">
                <Link to={"/juego/" + juego.id} className="nav-link active" aria-current="page">{juego.nombre}</Link>
            </h5>
            <p className="card-text">$ {juego.precio}</p>

            {!enCarrito ?
                (<a href="#" className="btn btn-primary" onClick={() => setEnCarrito(true)}>Comprar</a>)
                :
                (<a href="#" className="btn btn-secondary" onClick={() => setEnCarrito(false)}>En Carrito</a>)
            }
            
        </div>
    </div>
}

export default TarjetaJuego