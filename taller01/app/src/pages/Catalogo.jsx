import TarjetaDisco from "../components/TarjetaDisco";

function Catalogo({catalogo, favoritos, setFavoritos}) {
    return (
        <>
            <h1 class="text-lg font-bold mb-5">Catálogo</h1>

            <div class="flex flex-wrap">
                {catalogo.length > 0 ? (        
                    catalogo.map((disco) => {
                        let fav = false;

                        if(favoritos.includes(disco.id))
                            fav = true;

                        return (
                            <TarjetaDisco 
                                id={disco.id}
                                img={disco.img}
                                nombreGrupo={disco.nombreGrupo}
                                nombreDisco={disco.nombreDisco}
                                stock={disco.stock}
                                favoritos={favoritos}
                                setFavoritos={setFavoritos}
                            />
                        );
                    })        
                ) : (
                    <tr><td colspan="5">Catálogo vacío.</td></tr>
                )}
            </div>
        </>
    )
}

export default Catalogo;