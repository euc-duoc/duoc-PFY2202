import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { botonFormulario, entradaFormulario, headerSeccion } from '../Common';

export default function NuevoProceso({listaProcesos, setListaProcesos}) {
    const tipos = ["Estratégico", "Misional", "Soporte"];
    const [tipo, setTipo] = useState(0);
    const [nombre, setNombre] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();    

    function agregarProceso() {
        let nextId = listaProcesos.reduce((max, proc) => Math.max(max, proc.id), -Infinity) + 1;

        setListaProcesos([...listaProcesos, {
            id: nextId,
            nombre: nombre,
            desc: desc,
            tipo: tipos[tipo]
        }]);

        navigate('/procesos');
    }

    return (
        <div>
            {headerSeccion("Agregar proceso")}

            <div className="flex flex-col">
                {entradaFormulario("Tipo",
                    <select
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        className="py-2 text-sm text-gray-700 p-2 rounded-lg" 
                    >
                        {tipos.map((val, id) => <option value={id}>{val}</option>)}
                    </select>
                )}

                {entradaFormulario("Nombre",
                    <input
                        className="p-1 text-sm w-1/2 border border-gray-300"
                        value={nombre} 
                        onChange={e => setNombre(e.target.value)}
                    />
                )}

                {entradaFormulario("Descripción",
                    <input
                        className="p-1 text-sm w-1/2 border border-gray-300"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}                    
                    />
                )}

                {botonFormulario("Agregar", agregarProceso)}
            </div>
        </div>
    );
}