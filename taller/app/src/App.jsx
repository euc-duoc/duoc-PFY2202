import { useState, useEffect } from 'react'
import Menu from './components/Menu';
import AppRoutes from './components/AppRoutes';

function App() {
  /*const [favoritos, setFavoritos] = useState([]);
  const [catalogo, setCatalogo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);*/

  /*useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('/api/discos').
      then((resp) => {
        if(!resp.ok)
          throw new Error(resp.status + " - " + resp.statusText);

        return resp.json();
      }).
      then((data) => {
        setCatalogo(data);
        setLoading(false);
      }).
      catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);*/

  return (
    <div class="flex flex-col h-screen justify-between">
      <header class="text-4xl pb-10 font-extrabold p-5 bg-blue-400">Discos de Rock Progresivo</header>
      <main class="flex mb-auto">
        <Menu />
        <div class="w-2/3 p-5">
          <AppRoutes 
            /*catalogo={catalogo}
            setCatalogo={setCatalogo}
            favoritos={favoritos}
            setFavoritos={setFavoritos}
            loading={loading}
            error={error}*/
          />
        </div>
      </main>
      <footer class="p-5 bg-black text-white font-bold">Nombre empresa</footer>
    </div>
  )
}

export default App;
