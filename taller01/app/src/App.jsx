import { useState } from 'react'
import Menu from './components/Menu';
import AppRoutes from './components/AppRoutes';

function App() {
  const [favoritos, setFavoritos] = useState([]);
  const [catalogo, setCatalogo] = useState([
    {
      id: 1,
      img: "img/cover-01.jpg",
      nombreGrupo: "Deep Purple",
      nombreDisco: "Machine Head",
      stock: 10
    },
    {
      id: 2,
      img: "img/cover-02.jpg",
      nombreGrupo: "King Crimson",
      nombreDisco: "In the Court of the Crimson King",
      stock: 5
    },
    {
      id: 3,  
      img: "img/cover-03.jpg",
      nombreGrupo: "Pink Floyd",
      nombreDisco: "The Dark Side of the Moon",
      stock: 3
    },
    {
      id: 4,
      img: "img/cover-04.jpg",
      nombreGrupo: "Camel",
      nombreDisco: "Mirage",
      stock: 20
    },
    {
      id: 5,
      img: "img/cover-05.jpg",
      nombreGrupo: "Jethro Tull",
      nombreDisco: "Thick as a Brick",
      stock: 15
    }
  ]);

  return (
    <div class="flex flex-col h-screen justify-between">
      <header class="text-4xl pb-10 font-extrabold p-5 bg-blue-400">Discos de Rock Progresivo</header>
      <main class="flex mb-auto">
        <Menu />
        <div class="w-2/3 p-5">
          <AppRoutes 
            catalogo={catalogo}
            setCatalogo={setCatalogo}
            favoritos={favoritos}
            setFavoritos={setFavoritos}
          />
        </div>
      </main>
      <footer class="p-5 bg-black text-white font-bold">Nombre empresa</footer>
    </div>
  )
}

export default App;
