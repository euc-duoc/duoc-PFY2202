import TarjetaDisco from "../components/TarjetaDisco";
import { useState } from 'react'

function Catalogo({catalogo, favoritos, setFavoritos, loading, error}) {
    let Contenido = () => {
        if(loading) {
            return <p>Cargando catálogo...</p>
        }
        else if(error) {
            return <p>Error al cargar catálogo: {error.message}</p>
        }
        else {
            return (<div class="flex flex-wrap">
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
            </div>)
        }
    };

    return (
        <>
            <h1 class="text-lg font-bold mb-5">Catálogo</h1>
            <Contenido />            
        </>
    )
}

export default Catalogo;