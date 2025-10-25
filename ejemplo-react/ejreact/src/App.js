import logo from './logo.svg';
import './App.css';
import ControlNumero from './componentes/ControlNumero';

function App() {
  return (
    <div>
      <h1>Descifra la contraseña!</h1>
      <div class="row px-2" style={{width: 700}}>          
          <div class="col-3">
              <div><b>Mostrar selector</b></div>
          </div>
          <div class="col-9 text-start">  
            <div className="d-flex">
              <ControlNumero/>
              <ControlNumero/>
              <ControlNumero/>
            </div>            
          </div>
      </div>  
    </div>
  );
}

export default App;
