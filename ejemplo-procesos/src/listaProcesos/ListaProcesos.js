import { headerSeccion } from '../Common';
import styles from './ListaProcesos.module.css';
import { Link } from 'react-router-dom';

function ItemProceso({proceso}) {
  return (
    <tr>
      <td>{proceso.id}</td>
      <td>{proceso.nombre}</td>
      <td>{proceso.desc}</td>
      <td>{proceso.tipo}</td>
      <td className="flex justify-center">
        <Link to={`/proceso/${proceso.id}`}>
          {/* https://heroicons.com/ */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </Link>
      </td>
    </tr>
  )
}

export default function ListaProcesos({listaProcesos}) {
  return (
    <div>
      {headerSeccion("Procesos registrados")}
      <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Acciones</th>
          </tr>
        </thead>
        <tbody>      
      {listaProcesos.length > 0 ? (        
        listaProcesos.map((proceso, i) => (
          <ItemProceso key={proceso.id} proceso={proceso} />
        ))        
      ) : (
        <tr><td colspan="5">No hay procesos registrados</td></tr>
      )}
        </tbody>
      </table> 
    </div>
  );
};