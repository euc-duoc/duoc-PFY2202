import { useState } from 'react';
import ControlNumero from './ControlNumero';

export default function Selector({contrasenia}) {
    const [combinacion, setCombinacion] = useState([0, 0, 0]);

    function generarAvisoCambioNumero(indice) {
        return (valorNuevo) => {
            setCombinacion(combinacion.map((c, i) => {
                if (i === indice) {
                    return valorNuevo;
                } else {
                    return c;
                }
            }));
        }
    }

    const contraseniaCoindice = contrasenia.every(
        (v, i) => v === combinacion[i]
    );

    return (
        <>
            <div className="d-flex">
                <ControlNumero actualizarPadre={generarAvisoCambioNumero(0)}/>
                <ControlNumero actualizarPadre={generarAvisoCambioNumero(1)}/>
                <ControlNumero actualizarPadre={generarAvisoCambioNumero(2)}/>
            </div> 
            <div class="row d-flex p-1">
                {contraseniaCoindice ? (
                <b>Contraseña encontrada!</b>
                ) : (
                <b>Esa no es la contraseña!</b>
                )}              
            </div>
        </>
    );
}