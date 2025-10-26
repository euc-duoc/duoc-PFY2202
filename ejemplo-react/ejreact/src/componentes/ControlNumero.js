import { useState } from 'react';

export default function ControlNumero({actualizarPadre}) {
    const [numero, setNumero] = useState(0);

    function aumentarNumero() {
        let nuevo = numero;

        if(nuevo == 9)
            nuevo = 0;            
        else
            nuevo = nuevo + 1;

        setNumero(nuevo);
        actualizarPadre(nuevo);
    }

    function disminuirNumero() {
        let nuevo = numero;

        if(nuevo == 0)
            nuevo = 9;            
        else
            nuevo = nuevo - 1;

        setNumero(nuevo);
        actualizarPadre(nuevo);
    }

    return (
        <div className="col-2">
            <div className="row">
                <div class="col-2"><button onClick={disminuirNumero} class="botonCambio">-</button></div>
            </div>
            <div className="row">
                <div class="col-2"><div class="numero">{numero}</div></div>
            </div>
            <div className="row">
                <div class="col-2"><button onClick={aumentarNumero} class="botonCambio">+</button></div>
            </div>
        </div>
    );
}