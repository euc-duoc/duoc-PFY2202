import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Contacto from './components/pages/Contacto'
import Juego from './components/pages/Juego'
import Juegos from './components/pages/Juegos'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const [juegos, setJuegos] = useState([])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Juegos juegos={juegos} setJuegos={setJuegos}/>}/>
        <Route path="/juegos" element={<Juegos juegos={juegos} setJuegos={setJuegos}/>}/>
        <Route path="/juego/:id" element={<Juego juegos={juegos} />}/>
        <Route path="/contacto" element={<Contacto/>}/>
      </Routes>
    </Router>
  )
}

export default App
