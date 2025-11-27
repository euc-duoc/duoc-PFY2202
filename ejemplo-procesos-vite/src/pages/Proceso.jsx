import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BotonFormulario, EntradaFormulario, HeaderSeccion } from "../components/Common";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from '@apollo/client';

const GQL_OBTENER_PROCESO = gql`
  query ObtenerProceso($id: Int!) {
    proceso(id: $id) {
      nombre
      desc
      tipo
    }
  }
`;

const GQL_MODIFICAR_PROCESO = gql`
  mutation ModificarProceso($id: Int!, $desc: String!) {
    setProceso(id: $id, desc: $desc) {
      id
      desc
    }
  }
`;

function Proceso() { 
  const { pathname } = useLocation();
  let id = pathname.split("/")[2];
  id = decodeURIComponent(id);

  const [desc, setDesc] = useState("");
  const { loading, error, data } = useQuery(GQL_OBTENER_PROCESO, {
    fetchPolicy: 'network-only',
    variables: { id }
  });
  const [setProceso, { mLoading, mError }] = useMutation(GQL_MODIFICAR_PROCESO, {
    variables: { id, desc },
    onCompleted: () => {
      navigate('/procesos');
    }
  });

  useEffect(() => {
    if(data)
      setDesc(data.proceso.desc);
  }, [data, error]);

  const navigate = useNavigate(); 

  function actualizarDescripcion() {
    setProceso({ variables: { id, desc } });
  }

  if(loading) {
    return <p>Cargando proceso...</p>
  }
  else if (error) {
    return <p>Error al cargar proceso: {error.message}</p>
  }
  else {
    let proceso = data.proceso;

    let BotonDinamico = () => {
      if(mLoading) {
        return <BotonFormulario
          label={"Actualizando..."}
        />
      }
      else {
        let Boton = () => <BotonFormulario
          label={"Actualizar descripción"}
          onClick={actualizarDescripcion}
        />

        if(!mError)
          return <Boton/>;
        else
          return (<>
            <Boton/>
            <p>Error al actualizar proceso: {error.message}</p>
          </>);
      }
    };

    return (<div>
      <HeaderSeccion texto={"Proceso: " + proceso.nombre} />

      <div className="flex flex-col">
        <EntradaFormulario
          etiqueta={"Tipo"}
          elemValor={proceso.tipo}
        />

        <EntradaFormulario
          etiqueta={"Descripción"}
          elemValor={<input
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="p-1 text-sm w-1/2 border border-gray-300"
          />}
        />
      </div>
      
      <BotonDinamico/>
    </div>)
  }
};

export default Proceso;