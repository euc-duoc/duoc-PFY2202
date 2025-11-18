import { useState, useEffect, StrictMode } from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import AppRoutes from './AppRoutes';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const USE_GRAPHQL = true;

const GQL_OBTENER_PROCESOS = gql`
  query ObtenerProcesos {
    procesos {
      id
      nombre
      desc
      tipo
    }
  }
`;

function App() {
  const [listaProcesos, setListaProcesos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if(USE_GRAPHQL) {
    const { loading, error, data } = useQuery(GQL_OBTENER_PROCESOS)

    useEffect(() => {
      setLoading(loading);
      setError(error);

      if(data)
        setListaProcesos(data.procesos);
    }, [data, loading, error]);
  }
  else {
    useEffect(() => {      
      setLoading(true);
      setError(null);

      fetch('api/procesos').
        then((resp) => {

          if(!resp.ok)
              throw new Error(resp.status + " - " + resp.statusText);

          return resp.json();
        }).
        then((data) => {
          setListaProcesos(data);
          setLoading(false);
        }).
        catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  }  

  return (
    <StrictMode>
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
        
          {/* Área principal de secciones */}
          <main className="book-list">
            <AppRoutes 
              listaProcesos={listaProcesos} 
              setListaProcesos={setListaProcesos} 
              loading={loading}
            />
          </main>
        </div>			

        <footer className="text-center italic">
          <p>© 2025 Todos los derechos reservados.</p>
        </footer>
      </div>
    </StrictMode>
  )
}

export default App
