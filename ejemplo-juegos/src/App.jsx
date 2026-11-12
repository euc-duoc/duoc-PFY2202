import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Contacto from './components/pages/Contacto'
import Juego from './components/pages/Juego'
import Juegos from './components/pages/Juegos'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cargando from './components/Cargando'

function App() {
  const [juegos, setJuegos] = useState([])
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        const response = await fetch("/api/juegos")

        if (!response.ok) {
          throw new Error("Error al cargar los juegos")
        }

        const data = await response.json()
        setJuegos(data)

      } catch (error) {
        setError(error.message)

      } finally {
        setLoading(false)
      }
    }

    obtenerJuegos()
  }, []);

  return (
    <Router>
      <Header /> 
      { loading ? (
        <Cargando />
      ) : error ? (
        <div style={{ color: "red", fontWeight: "bolder" }}>                        
          <img style={{ width: "30px" }} src="./img/warning.png"/>&nbsp;
            No se pudo cargar los datos.
        </div>)

        :

      <Routes>
        <Route path="/" element={<Juegos juegos={juegos} setJuegos={setJuegos}/>}/>
        <Route path="/juegos" element={<Juegos juegos={juegos} setJuegos={setJuegos}/>}/>
        <Route path="/juego/:id" element={<Juego juegos={juegos} />}/>
        <Route path="/contacto" element={<Contacto/>}/>
      </Routes> }
    </Router>
  )
}

export default App
