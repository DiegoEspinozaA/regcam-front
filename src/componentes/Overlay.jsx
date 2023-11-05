
import Scrollbar from 'smooth-scrollbar';
import { useEffect, useState } from 'react';
import { registroEliminadoExitoso } from '../Toast/Notificaciones';
import Link from '../Apiconf';
import Nav from './Nav';
import TablaRegistros from './TablaRegistros';
import { useParams } from 'react-router-dom';

export default function Overlay() {
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [datos, setDatos] = useState([]);

  console.log(id)

  useEffect(() => {
    fetch(Link + '/registrosCamara/' + id)
      .then(response => response.json())
      .then(data => {
        const registrosConFechasFormateadas = data.map(registro => {
          const fechaFormateada = new Date(registro.fecha)
            .toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })
            .replace(/\//g, '-');

          return {
            ...registro,
            fecha: fechaFormateada
          };
        });

        setDatos(registrosConFechasFormateadas);
        setIsLoading(false);
      })

      .catch(error => {
      });

  }, []);

  console.log(datos);

  const handleDelete = (id) => {
    setDatos(datos.filter((item) => item.id !== id));
    registroEliminadoExitoso();
    fetch(Link + '/eliminarRegistro/' + id, {
      method: 'DELETE',
    }).then(() => {
      fetch(Link + '/registrosCamara/' + id)
        .then(response => response.json())
        .then(data => {
          setDatos(data);


        })
        .catch(error => {
        });
    });
  }


  return (
    <>
      <div className='p-4  xl:ml-80  h-[calc(96vh-32px)]  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 '>
        <Nav></Nav>
        <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded  mt-3">

          <div className="bg-white shadow-lg border border-gray-300 rounded-lg text-sm">
            <div className="py-4 px-5">
              <div className="relative text-gray-600 focus-within:text-black  w-full rounded ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 "
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>

                <input
                  type="text"
                  className=" py-2 pl-10 focus:ring-1 shadow-md focus:outline-none border rounded border-gray-300"
                  placeholder="Buscar"
                  style={{ width: '400px' }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto  bg-white ">
              <div className="overflow-y-auto  bg-white h-[74vh]">
                <TablaRegistros registros={datos} busqueda={searchTerm}></TablaRegistros>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}