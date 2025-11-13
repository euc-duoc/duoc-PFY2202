import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import ListaProcesos from './pages/ListaProcesos';
import Proceso from './pages/Proceso';
import NuevoProceso from './pages/NuevoProceso';
import Main from './pages/Main';
import { Suspense } from 'react';

function AppRoutes({listaProcesos, setListaProcesos, loading}) {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/procesos" element={
          <ListaProcesos 
            listaProcesos={listaProcesos}
            loading={loading}
          />
        }/>
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
        <Route path="/" element={
          <Main />
        }/>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes