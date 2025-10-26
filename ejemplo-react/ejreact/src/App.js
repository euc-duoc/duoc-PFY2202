import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Selector from './componentes/Selector';

function App() {
  const [contrasenia] = useState([1, 3, 3]);

  return (
    <Router>
      <div>
        <h1>Descifra la contraseña!</h1>
        <div class="row px-2" style={{width: 700}}>          
            <div class="col-3">
              <div><Link to="/">Ver selector</Link></div>  
              <div><Link to="/ver-contrasenia">Ver contraseña</Link></div>          
            </div>
            <div class="col-9 text-start">  
              <Routes>
                <Route path="/" element={<Selector contrasenia={contrasenia}/>} /> 
                <Route path="/ver-contrasenia" element= {(
                    <div>La contraseña es {contrasenia.join("")}!</div>
                  )}
                />             
              </Routes>
            </div>
        </div>  
      </div>
    </Router>
  );
}

export default App;
