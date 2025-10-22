import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Proceso({listaProcesos, setListaProcesos}) {
  const { pathname } = useLocation();
  let id = pathname.split("/")[2];
  id = decodeURIComponent(id);
  let proceso = listaProcesos.find((proc) => proc.id == id);
  const descRef = useRef();
  const navigate = useNavigate();

  const cambioProceso = () => {
    const procesosAct = listaProcesos.map(mProceso => {
      if(mProceso.id != proceso.id)
        return mProceso;

      return {
        ...mProceso,
        desc: descRef.current.value
      }
    });

    setListaProcesos(procesosAct);
    navigate('/procesos')
  };

  return (
    <div>
      <h3>Proceso: <b>{proceso.nombre}</b></h3>
      <div className="row m-2">
        <div className="col-3 text-end">Tipo:</div>
        <div className="col-9 text-right">{proceso.tipo}</div>
      </div>
      <div className="row m-2">
        <div className="col-3 text-end">Descripción:</div>
        <div className="col-9 text-right">
          <input style={{width: "100%"}}
            ref={descRef}
            defaultValue={proceso.desc}
          />
        </div>
      </div>
      <div className="row m-2">
        <div className="col text-center">
          <button onClick={cambioProceso}>
            Actualizar descripción
          </button>
        </div>
      </div>
    </div>
  );
};