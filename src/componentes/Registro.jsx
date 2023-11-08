
import { useEffect, useState } from 'react';
import { registroEliminadoExitoso } from '../Toast/Notificaciones';
import Link from '../Apiconf';
import Nav from './Navbar';
import TablaRegistro from './TablaRegistro';
import { useParams } from 'react-router-dom';

export default function Overlay() {
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [datos, setDatos] = useState([]);


  useEffect(() => {
    fetch(Link + '/registrosCamara/' + id)
      .then(response => response.json())
      .then(data => {
        setDatos(data);
        setIsLoading(false);
      })

      .catch(error => {
      });
  }, []);

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
          <div className="bg-white shadow-lg  rounded-lg text-sm">
            <div className='flex'>
              <div className="flex text-gray-600 justify-between w-full">
                <div>
                  <div className="relative">
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
                      className="py-2 pl-10 pr-3 focus:ring-1 text-sm focus:outline-none border rounded border-gray-300 transition duration-200 "
                      placeholder='Buscar'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-full rounded-lg shadow-md h-[84vh] border border-gradient from-red-500 via-purple-500 to-blue-500">
              <div className="overflow-y-auto scrollbar-container bg-white max-h-full mt-1">
                <TablaRegistro id ={id} registros={datos} busqueda={searchTerm}></TablaRegistro>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}