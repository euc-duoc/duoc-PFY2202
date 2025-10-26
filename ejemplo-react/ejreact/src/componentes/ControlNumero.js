import { useState } from 'react';
import styles from './ControlNumero.module.css';

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
                <div className="col-2">
                    <button className={styles.botonCambio} onClick={disminuirNumero}>-</button>
                </div>
            </div>
            <div className="row">
                <div className="col-2"><div className={styles.numero}>{numero}</div></div>
            </div>
            <div className="row">
                <div className="col-2">
                    <button className={styles.botonCambio} onClick={aumentarNumero}>+</button>
                </div>
            </div>
        </div>
    );
}