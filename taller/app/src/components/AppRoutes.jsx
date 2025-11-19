import { Routes, Route } from 'react-router-dom';
import Favoritos from '../pages/Favoritos';
import Catalogo from '../pages/Catalogo';

function AppRoutes(/*{catalogo, setCatalogo, favoritos, setFavoritos, loading, error}*/) {
  return (
    <Routes>
      <Route path="/favoritos" element={
        <Favoritos
          /*catalogo={catalogo}
          setCatalogo={setCatalogo}
          favoritos={favoritos}
          setFavoritos={setFavoritos}*/
        />
      }/>
      <Route path="/" element={
        <Catalogo
          /*catalogo={catalogo} 
          favoritos={favoritos} 
          setFavoritos={setFavoritos}
          loading={loading}
          error={error}*/
        />
      }/>
    </Routes>
  )
}

export default AppRoutes