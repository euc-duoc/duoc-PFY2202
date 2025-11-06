import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div class="w-[200px] p-5 mb-10">
            <h1 class="text-lg font-bold mb-5">Menú</h1>
            <ul>
                <li class="text-gray-500 font-bold"><Link to="/">Ver catálogo</Link></li>
                <li class="text-gray-500 font-bold"><Link to="/favoritos">Ver favoritos</Link></li>
            </ul>
        </div>
    );
}

export default Menu;