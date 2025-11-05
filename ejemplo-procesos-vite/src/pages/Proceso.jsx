import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BotonFormulario, EntradaFormulario, HeaderSeccion } from "../components/Common";

export default function Proceso({listaProcesos, setListaProcesos}) {
  const { pathname } = useLocation();
  let id = pathname.split("/")[2];
  id = decodeURIComponent(id);
  let proceso = listaProcesos.find((proc) => proc.id == id);
  const navigate = useNavigate();
  const [desc, setDesc] = useState(proceso.desc);

  const cambioProceso = () => {
    const procesosAct = listaProcesos.map(mProceso => {
      if(mProceso.id != proceso.id)
        return mProceso;

      return {
        ...mProceso,
        desc: desc
      }
    });

    setListaProcesos(procesosAct);
    navigate('/procesos')
  };

  return ( 
    <div>
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
      
      <BotonFormulario
        label={"Actualizar descripción"}
        onClick={cambioProceso}
      />
    </div>
  );
};