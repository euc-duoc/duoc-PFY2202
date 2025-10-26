import logo from './logo.svg';
import './App.css';
import ControlNumero from './componentes/ControlNumero';
import { useState } from 'react';

function App() {
  const [combinacion, setCombinacion] = useState([0, 0, 0]);
  const [contrasenia, setContrasenia] = useState([1, 2, 3]);

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
    <div>
      <h1>Descifra la contraseña!</h1>
      <div class="row px-2" style={{width: 700}}>          
          <div class="col-3">
              <div><b>Mostrar selector</b></div>
          </div>
          <div class="col-9 text-start">  
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
          </div>
      </div>  
    </div>
  );
}

export default App;
