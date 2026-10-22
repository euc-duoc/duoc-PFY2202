import "./Header.css"
import {Link} from 'react-router-dom'

function Header() {
    return <div className="header navbar navbar-expand-sm">
        <div className="container-fluid">
            <a className="navbar-brand title" href="#">Juegos de mesa</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-0 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/juegos" className="nav-link active" aria-current="page">Juegos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contacto" className="nav-link active" aria-current="page">Contacto</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default Header