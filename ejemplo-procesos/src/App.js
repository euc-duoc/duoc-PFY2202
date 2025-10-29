import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ListaProcesos from './listaProcesos/ListaProcesos';
import Proceso from './proceso/Proceso';
import NuevoProceso from './proceso/NuevoProceso';
import { headerSeccion } from './Common';

function App() {
  const [listaProcesos, setListaProcesos] = useState([
    {
        id: 1, nombre: "Planificación estratégica",
        desc: "Definición de prioridades a largo plazo.",
        tipo: "Estratégico"
    },{
        id: 2, nombre: "Desarrollo curricular",
        desc: "Gestión de los principios y la implementación del Modelo Educativo institucional.",
        tipo: "Misional"
    },{
        id: 3, nombre: "Adquisiciones",
        desc: "Soporte a los procesos de adquisición de bienes y servicios.",
        tipo: "Soporte"
    },
  ]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="mb-4 font-extrabold tracking-tight text-5xl text-white">Gestión de procesos</h1>
        </header>

        <div className="content">
          {/* Menú lateral */}
          <nav className="side-menu">
            <h2 className="text-3xl mb-4 font-bold">Menú</h2>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/procesos">Procesos registrados</Link></li>
              <li><Link to="/nuevo-proceso">Agregar proceso</Link></li>
            </ul>
          </nav>

          {/* Área principal que muestra libros */}
          <main className="book-list">
            <Routes>
              <Route path="/procesos" element={<ListaProcesos listaProcesos={listaProcesos}/>} />
              <Route path="/proceso/:id" element={
                <Proceso 
                  listaProcesos={listaProcesos} 
                  setListaProcesos={setListaProcesos} 
                />
              }/>
              <Route path="/nuevo-proceso" element={
                <NuevoProceso 
                  listaProcesos={listaProcesos} 
                  setListaProcesos={setListaProcesos} 
                />
              }/>
              <Route path="/" element={<>
                {headerSeccion("Inicio")}
                <p>Esta es la página inicial.</p></>} 
              />
            </Routes>
          </main>
        </div>

        <footer className="text-center italic">
          <p>© 2025 Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
