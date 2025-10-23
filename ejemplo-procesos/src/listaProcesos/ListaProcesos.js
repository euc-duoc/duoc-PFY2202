import styles from './ListaProcesos.module.css';
import { Link } from 'react-router-dom';

function ItemProceso({proceso}) {
  return (
    <tr>
      <td>{proceso.id}</td>
      <td>{proceso.nombre}</td>
      <td>{proceso.desc}</td>
      <td>{proceso.tipo}</td>
      <td><Link to={`/proceso/${proceso.id}`}><i className="bi bi-pencil"></i></Link></td>
    </tr>
  )
}

export default function ListaProcesos({listaProcesos}) {
  return (
    <div>
      <h2>Procesos registrados</h2>
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