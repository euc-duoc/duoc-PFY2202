import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BotonFormulario, EntradaFormulario, HeaderSeccion } from '../components/Common';

function NuevoProceso({listaProcesos, setListaProcesos}) {
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
			<HeaderSeccion texto={"Agregar proceso"} />

			<div className="flex flex-col">
				<EntradaFormulario
					etiqueta={"Tipo"}
					elemValor={<select
						value={tipo}
						onChange={e => setTipo(e.target.value) }
						className="py-2 text-sm text-gray-700 p-2 rounded-lg" 
					>
						{tipos.map((val, id) => <option value={id}>{val}</option>)}
					</select>}
				/>

				<EntradaFormulario
					etiqueta={"Nombre"}
					elemValor={<input
							className="p-1 text-sm w-1/2 border border-gray-300"
							value={nombre} 
							onChange={e => setNombre(e.target.value) }
					/>}
				/>
				
				<EntradaFormulario
					etiqueta={"Descripción"}
					elemValor={<input
						className="p-1 text-sm w-1/2 border border-gray-300"
						value={desc}
						onChange={e => setDesc(e.target.value)}                    
					/>}
				/>

				<BotonFormulario
					label={"Agregar"}
					onClick={agregarProceso}
				/>
			</div>
		</div>
	);
}

export default NuevoProceso;