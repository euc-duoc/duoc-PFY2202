import { useLocation } from 'react-router-dom'

function Juego({ juegos }) {
    const { pathname } = useLocation();
    const id = pathname.split("/")[2];
    const juego = juegos.filter(n => n.id == id)[0];
    console.log(juego)

    return <main className="contenido">
        <div className="subtitle">{juego.nombre}</div>
        <div>Precio: ${juego.precio}</div>
    </main>  
}

export default Juego
