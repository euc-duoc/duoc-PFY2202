import { useState } from 'react'
import ListaMascotas from './components/ListaMascotas';
ListaMascotas

function App() {
  const [mascotas] = useState([
    {
      id: 1,
      nombre: "Ada",
      tipo: "Perro",
      raza: "Mestiza",
      img: "img/gatito.jpg"
    },
    {
      id: 2,
      nombre: "Flaquito",
      tipo: "Perro",
      raza: "Pastor Alemán",
      img: "img/gatito.jpg"
    },
    {
      id: 3,
      nombre: "Willy",
      tipo: "Perro",
      raza: "Mestizo",
      img: "img/gatito.jpg"
    },
    {
      id: 4,
      nombre: "Martina",
      tipo: "Gato",
      raza: "Mestizo",
      img: "img/gatito.jpg"
    }
  ]);

  return (
    <div className="flex">
      <ListaMascotas mascotas={mascotas}/>
    </div>
  )
}

export default App
