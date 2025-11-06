import TarjetaDisco from "../components/TarjetaDisco";
import { useState } from 'react'

function Catalogo({catalogo, favoritos, setFavoritos}) {
    const [catalogoFiltrado, setCatalogoFiltrado] = useState(catalogo);

    function aplicarFiltro(e) {
        let texto = e.target.value;

        if(texto == "") {
            setCatalogoFiltrado(catalogo);
        }
        else {
            const copiaCatalogoFiltrado = catalogoFiltrado.filter(disco => disco.nombreGrupo.startsWith(texto));
            setCatalogoFiltrado(copiaCatalogoFiltrado);
        }
    }

    return (
        <>
            <h1 class="text-lg font-bold mb-5">Catálogo</h1>

            <div class="flex">
                <div class="w-1/3">Artista:</div>
                <div class="w-2/3">
                    <input
                        onChange={aplicarFiltro} 
                        class="bg-gray-100"
                    />
                </div>
            </div>

            <div class="flex flex-wrap">
                {catalogoFiltrado.length > 0 ? (        
                    catalogoFiltrado.map((disco) => {
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