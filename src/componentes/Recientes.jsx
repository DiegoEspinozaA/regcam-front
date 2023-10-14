import { useEffect, useState } from 'react';
import Link from '../Apiconf';
export default function Recientes() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetch(Link + '/registros')
      .then(response => response.json())
      .then(data => {
        setRegistros(data);
      })
      .catch(error => {
      });
  }, []);

  const handleDelete = (id) => {
    setRegistros(registros.filter((item) => item.id !== id));
    fetch(Link + '/eliminarRegistro/' + id, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Registro eliminado exitosamente.');
      } else {
        console.error('Error al eliminar el registro.');
      }
    })
    .catch((error) => {
      console.error('Error de red:', error);
    });
};

  return (
    <div className='flex justify-center w-full'>
      
      <div className="text-sm mt-10 text-black flex flex-col justify-center w-[80%] bg-white shadow-lg rounded border border-gray-300">
        <table className="w-full mt-10">
          <thead className=''>
            <tr className="bg-background-color text-left">
              <th className="px-4 py-3  border-b border-t border-gray-300" style={{ width: '20%' }}>Fecha</th>
              <th className="px-4 py-3 border-b border-t border-gray-300" style={{ width: '20%' }}>Evento</th>
              <th className="px-4 py-3 t border-b border-t  border-gray-300" style={{ width: '30%' }}>Descripcion</th>
              <th className="text-center px-6 py-3 border-b border-t border-gray-300" style={{ width: '10%' }} >¿Fue notificado?</th>
              <th className="px-4 py-3 border-b border-t border-gray-300" style={{ width: '10%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros
              .map((dato) => (
                <tr
                  key={dato.id}
                  isSelectable
                  onSelect={() => alert(dato.id)}
                  className="hover:bg-gray-200"
                >
                  <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '20%' }}>
                    {new Date(dato.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '20%' }}>{dato.tipo}</td>
                  <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '30%' }}>{dato.descripcion}</td>
                  <td className="px-6 py-3 border-b border-gray-300 truncate-cell justify-center" style={{ width: '10%' }}>
                    <div className='flex w-full align-center justify-center'>
                      {dato.notificado ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                      </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                      </svg>}
                    </div>

                  </td>
                  <td className="py-3 border-b border-gray-300" style={{ width: '10%' }}>
                    <div className='flex pl-4 '>
                    <button className='rounded-tl-lg rounded-bl-lg border-b border-l border-t border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in'>Ver</button>
                    <button className='border border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in'>Editar</button>
                    <button className='rounded-tr-lg rounded-br-lg bg-red-200 py-1 px-2 border-r border-t border-b border-gray-400 text-red-700 font-semibold hover:bg-red-400 transition duration-100 ease-in' onClick={() => handleDelete(dato.id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}