import React from 'react';
import { useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { GoX } from 'react-icons/go';
import Scrollbar from 'smooth-scrollbar';
import { registroEliminadoExitoso } from '../Toast/Notificaciones';
import Link from '../Apiconf';

function OverlayPage({ numero, locacion, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch(Link + '/registrosCamara/' + numero)
      .then(response => response.json())
      .then(data => {
        setDatos(data);
        setIsVisible(true);
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
      fetch(Link + '/registrosCamara/' + numero)
        .then(response => response.json())
        .then(data => {
          setDatos(data);

          setIsVisible(true);

        })
        .catch(error => {
        });
    });
  }
  const handleOverlayClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);



  useEffect(() => {
    const scrollbarContainer = document.querySelector('.scrollbar-container');
    const scrollbar = Scrollbar.init(scrollbarContainer);

    return () => {
      scrollbar.destroy();
    };
  }, []);

  return (
    <>
      <div
        className={`p-10 text-black fixed inset-0 flex items-center justify-center z-50 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        style={{ backdropFilter: 'blur(40px)' }}
      >
        <div className="absolute inset-0 bg-black opacity-60 "></div>
        <div className="bg-background-color rounded-lg p-10 w-[80%] relative z-10 text-sm ">
          <div className="relative mb-4">
            <div className="mb-10 text-center justify-center">
              <div>
                <h2 className="text-xl font-bold mb-2"> Registros Camara {numero}</h2>

              </div>
              <div className='flex align-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor" />
                </svg>
                <p className='ml-2'>{locacion}</p>

              </div>
            </div>

            <div className="bg-white shadow-lg border border-gray-300 rounded-lg ">
              <div className="py-4 px-5">
                <div className="relative text-gray-600 focus-within:text-black font-semibold w-full rounded ">
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
                    className=" py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300"
                    placeholder="Buscar"
                    style={{ width: '400px', height: '50px' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-y-auto min-h-[600px] max-h-[600px] scrollbar-container bg-white rounded-lg">
                <table className="w-full">
                  <thead className='sticky top-0'>
                    <tr className="bg-background-color text-black">
                      <th className="px-4 py-3 text-left border-b border-t border-l border-gray-300" >Fecha</th>
                      <th className="px-4 py-3 text-left border-b border-l border-t border-gray-300">Evento</th>
                      <th className="px-4 py-3 text-left border-b border-t border-l border-gray-300" >Descripcion</th>
                      <th className="px-6 py-3 text-left  border-l border-b border-t border-r border-gray-300" >¿Fue notificado?</th>
                      <th className="px-4 py-3 text-left rounded-tr-lg rounded-br-lg justify-end border-b border-t border-l border-gray-300">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datos
                      .filter(dato =>
                        Object.values(dato).some(value =>
                          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                      )
                      .map((dato) => (
                        <tr
                          key={dato.id}
                          isSelectable
                          onSelect={() => alert(dato.id)}
                          className="hover:bg-gray-200 transition duration-100 ease-in"
                        >
                          <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '15%' }}>
                            {new Date(dato.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '15%' }}>{dato.tipo}</td>
                          <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '25%' }}>{dato.descripcion}</td>
                          <td className="px-6 py-3 border-b border-gray-300 truncate-cell justify-center" style={{ width: '10%' }}>
                            {dato.notificado ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M5 12l5 5l10 -10" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fd0061" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M18 6l-12 12" />
                              <path d="M6 6l12 12" />
                            </svg>}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-300 truncate-cell" style={{ width: '15%' }}>
                            <button className='rounded-tl-lg rounded-bl-lg border-b border-l border-t border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in'>Ver</button>
                            <button className='border border-gray-400 py-1 px-2 hover:bg-gray-300 transition duration-100 ease-in'>Editar</button>
                            <button className='rounded-tr-lg rounded-br-lg bg-red-200 py-1 px-2 border-r border-t border-b border-gray-400 text-red-700 font-semibold hover:bg-red-400 transition duration-100 ease-in' onClick={() => handleDelete(dato.id)}>Eliminar</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <button
            onClick={handleOverlayClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
          >
            <GoX size={25} />
          </button>
        </div>

      </div>
    </>
  );
}


export default function Registros() {
  const [locaciones, setLocaciones] = useState([]);
  const [camaras, setCamaras] = useState([]);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [botonSeleccionado, setBotonSeleccionado] = useState(null);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    fetch(Link + '/camaras')
      .then(res => res.json())
      .then(data => {
        setCamaras(data);
      })
      .catch(error => {
        console.error('Error en la primera solicitud:', error);
      });

    fetch(Link + '/locaciones')
      .then(res => res.json())
      .then(data => {
        setLocaciones(data);
      })
      .catch(error => {
        console.error('Error en la segunda solicitud:', error);
      });
  }, [])

  const handleClick = (ubicacion) => {
    setUbicacionSeleccionada(ubicacionSeleccionada === ubicacion ? null : ubicacion);
    setAbierto(true);
  };

  const camerasPorLocacion = {};
  camaras.forEach(camera => {
    const locacion = camera.locacion;
    if (!camerasPorLocacion[locacion]) {
      camerasPorLocacion[locacion] = [];
    }
    camerasPorLocacion[locacion].push(camera.id);
  });

  const handleClose = () => {
    setUbicacionSeleccionada(null);
    setBotonSeleccionado(null);
  };

  const handleOpenModal = (numero) => {
    setBotonSeleccionado(numero);
    setAbierto(true);
  };

  return (
    <div className="flex items-center w-full px-40 py-10 " >
      <div className="grid gap-4 w-full ">
        {locaciones.map((ubicacion) => (
          <div
            key={ubicacion.locacion}
            className={`p-4 text-zinc-800  border border-gray-400 shadow-md rounded bg-white ${ubicacionSeleccionada !== ubicacion.locacion ? ' hover:shadow-xl hover:text-black  cursor-pointer transition duration-300 ease-in-out' : ''}`}
            onClick={ubicacionSeleccionada === ubicacion.locacion ? null : () => handleClick(ubicacion.locacion)}
          >
            <div onClick={ubicacionSeleccionada === ubicacion.locacion ? handleClose : null} className={`flex justify-between ${ubicacionSeleccionada === ubicacion.locacion ? 'cursor-pointer hover:text-red-500 transition duration-100 ease-in-out text-black border-b border-gray-400 ' : ''}`}>
              <div className='flex justify-between w-full items-center'>
                <h2 className={`py-2 text-lg text-sm ${ubicacionSeleccionada === ubicacion.locacion ? 'cursor-pointer' : ''}`}>
                  {ubicacion.locacion}
                </h2>
                {ubicacionSeleccionada !== ubicacion.locacion && (
                  <BiChevronDown size={25} />
                )}
              </div>
              <div className="flex justify-end " >
                {ubicacionSeleccionada === ubicacion.locacion && (
                  <button
                    onClick={() => handleClose()}
                    className=""
                  >
                    <GoX size={25} />
                  </button>
                )}
              </div>
            </div>
            {ubicacionSeleccionada === ubicacion.locacion && (
              <div className="flex py-3 justify-center w-full ">
                <div className="grid gap-4 lg:grid-cols-10  md:grid-cols-4 sm:grid-cols-2">
                  {camerasPorLocacion[ubicacionSeleccionada]?.map((camera, index) => (
                    <button
                      key={index}
                      className={`relative group flex items-center text-white border border-gray-900 justify-center w-16 h-16 bg-gray-500 rounded-lg `}
                      onClick={() => handleOpenModal(camera)}
                    >
                      <div className='absolute top-1 left-1  rounded-full bg-gray-700 w-2 h-2 transition duration-100 group-hover:bg-red-500 border border-black'>
                      </div>
                      <div className='border bg-blue-500 border-black rounded-full w-11 h-11 text-white flex items-center justify-center transition duration-100 ease-in group-hover:bg-red-500'>
                        <p className="text-lg font-semibold">{camera}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {botonSeleccionado && (
        <OverlayPage numero={botonSeleccionado} locacion={ubicacionSeleccionada} onClose={() => setBotonSeleccionado(null)} />
      )}
    </div>

  );
}