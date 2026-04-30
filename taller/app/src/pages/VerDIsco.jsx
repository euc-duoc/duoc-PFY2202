import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';

const GQL_OBTENER_DISCO = gql`
  query ObtenerDisco($id: Int!) {
    disco(id: $id) {
        id
        img
        nombreGrupo
        nombreDisco
        stock
    }
  }
`;

const GQL_MODIFICAR_DISCO = gql`
  mutation ModificarDisco($id: Int!, $stock: Int!) {
    setDisco(id: $id, stock: $stock) {
      id
      stock
    }
  }
`;

let Contenido = ({stock, setStock, loading, error, data}) => {
    function actualizarStock() {
        setDisco({ variables: { id, stock } })
    }

    if(loading) {
        return <p>Cargando disco...</p>
    }
    else if(error) {
        return <p>Error al cargar disco: {error.message}</p>
    }
    else {
        let disco = data.disco;

        return (<div>
            <p>ID: {disco.id}</p>
            <p>Nombre Grupo: {disco.nombreGrupo}</p>
            <p>Nombre Disco: {disco.nombreDisco}</p>
            <p>Stock: 
                <input
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    className="p-1 text-sm w-1/2 border border-gray-300"
                />
            </p>
            <img src={"/" + disco.img} />
            <button onClick={actualizarStock} className="bg-blue-900 px-2 py-1 rounded-lg text-white font-bold">Actualizar stock</button>
        </div>)
    }
};

function VerDisco() {
    const { pathname } = useLocation();
    let id = pathname.split("/")[2];
    id = decodeURIComponent(id);
    console.log(id);

    //const [disco, setDisco] = useState(null);

    const { loading, error, data } = useQuery(GQL_OBTENER_DISCO, {
        variables: { id },
        fetchPolicy: 'network-only'
    });

    const [stock, setStock] = useState(0);
    const navigate = useNavigate();

    const [setDisco, { mLoading, mError }] = useMutation(GQL_MODIFICAR_DISCO, {
        variables: { id, stock },
        onCompleted: () => {
            navigate('/');
        }
    });    

    useEffect(() => {
        if(data) {
            setStock(data.disco.stock);
        }
    }, [data]);

    return (
        <>
            <h1 class="text-lg font-bold mb-5">Ver disco</h1>
            <Contenido 
                stock={stock}
                setStock={setStock} 
                loading={loading}
                error={error}
                data={data}
            />            
        </>
    )
}

export default VerDisco;