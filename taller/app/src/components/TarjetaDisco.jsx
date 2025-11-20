import { useNavigate } from "react-router-dom";

function TarjetaDisco({id, img, nombreGrupo, nombreDisco, stock/*, favoritos, setFavoritos*/}) {
    let esFavorito = /*favoritos.includes(id)*/false;
    const navigate = useNavigate(); 

    function cambiarEstadoFavorito() {
        /*if(esFavorito)
            setFavoritos(favoritos.filter(idCheck => idCheck != id));
        else
            setFavoritos([...favoritos, id]);*/
    }

    function verDetalle() {
        navigate(`/disco/${id}`)
    }

    return (
        <div class="flex flex-col w-[200px] border-1 rounded-sm p-2 border-gray-300 m-5 text-center">
            <img src={"./" + img} />
            <p class="font-bold">{nombreGrupo}</p>
            <p class="text-sm">{nombreDisco}</p>
            <p class="italic text-sm">{stock} disponible(s)</p>
            <button onClick={verDetalle} class="mt-2 bg-blue-500 hover:bg-blue-900 font-bold text-white rounded-lg p-1">Ver Detalle</button>
            {/*!esFavorito ? 
                <button onClick={cambiarEstadoFavorito} class="mt-2 bg-blue-500 hover:bg-blue-900 font-bold text-white rounded-lg p-1">Favorito</button> :                 
                <button onClick={cambiarEstadoFavorito} class="mt-2 bg-red-500 hover:bg-red-900 font-bold text-white rounded-lg p-1">Quitar</button>
            */}            
        </div>
    )
}

export default TarjetaDisco;