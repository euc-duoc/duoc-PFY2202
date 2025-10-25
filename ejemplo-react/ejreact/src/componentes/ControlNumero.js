import { useState } from 'react';

export default function ControlNumero() {
    const [numero, setNumero] = useState(0);

    return (
        <div className="col-2">
            <div className="row">
                <div class="col-2"><button class="botonCambio">-</button></div>
            </div>
            <div className="row">
                <div class="col-2"><div class="numero">{numero}</div></div>
            </div>
            <div className="row">
                <div class="col-2"><button class="botonCambio">+</button></div>
            </div>
        </div>
    );
}