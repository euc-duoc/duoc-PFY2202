import { Routes, Route } from 'react-router-dom';
import Favoritos from '../pages/Favoritos';
import Catalogo from '../pages/Catalogo';

function AppRoutes({catalogo, setCatalogo, favoritos, setFavoritos}) {
  return (
    <Routes>
      <Route path="/favoritos" element={
        <Favoritos
          catalogo={catalogo}
          setCatalogo={setCatalogo}
          favoritos={favoritos}
          setFavoritos={setFavoritos}
        />
      }/>
      <Route path="/" element={
        <Catalogo
          catalogo={catalogo} 
          favoritos={favoritos} 
          setFavoritos={setFavoritos}
        />
      }/>
    </Routes>
  )
}

export default AppRoutes