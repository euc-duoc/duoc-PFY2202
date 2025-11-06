import ElemFavorito from "../components/ElemFavorito";

function Favoritos({catalogo, setCatalogo, favoritos, setFavoritos}) {
    let soloFavoritos = catalogo.filter((disco) => favoritos.includes(disco.id));

    return (
        <>
            <h1 class="text-lg font-bold mb-5">Favoritos</h1>

            {soloFavoritos.length > 0 ? (        
                soloFavoritos.map((disco) => (
                    <ElemFavorito 
                        id={disco.id}
                        catalogo={catalogo}
                        setCatalogo={setCatalogo}
                        favoritos={favoritos}
                        setFavoritos={setFavoritos}
                    />
                ))        
            ) : (
                <tr><td colspan="5">No hay elementos favoritos.</td></tr>
            )}
        </>
    );
}

export default Favoritos;