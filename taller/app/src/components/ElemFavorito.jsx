function ElemFavorito({id, catalogo, setCatalogo, favoritos, setFavoritos}) {
    let disco = catalogo.find((disco) => disco.id == id);   

    function reservarDisco() {
        if(disco.stock == 0) {
            alert("No hay stock para el disco seleccionado.");
            return;
        }

        const copiaCatalogo = catalogo.map(disco => {
            if(disco.id != id)
                return disco;

            return {
                ...disco,
                stock: disco.stock - 1
            }
        });

        setCatalogo(copiaCatalogo);
        //setFavoritos(favoritos.filter(idCheck => idCheck != id));
        alert("Se ha hecho la reserva del disco seleccionado.");
    }

    return (
        <div class="flex w-8/9 border-1 rounded-sm p-2 border-gray-300 mx-5 my-2 items-center">                            
            <p class="w-3/10 font-bold mx-4 text-center">{disco.nombreGrupo}</p>
            <p class="w-3/10 mx-4 text-center">{disco.nombreDisco}</p>
            <p class="w-2/10 italic font-sm text-center">({disco.stock} disponibles)</p>
            <button onClick={reservarDisco} class="w-2/10 mx-4 bg-blue-500 hover:bg-blue-900 font-bold text-white rounded-lg p-2">Reservar</button>
        </div>
    );
}

export default ElemFavorito;