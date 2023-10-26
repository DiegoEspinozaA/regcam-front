import React from 'react';
import { useState, useEffect } from 'react';
import Overlay from './Overlay';
import Link from '../Apiconf';
import { Accordion, AccordionItem } from "@nextui-org/react";
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
    setExpanded(!isExpanded);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  const handleOpenModal = (numero) => {
    setBotonSeleccionado(numero);
    setAbierto(true);
  };

  const [isExpanded, setExpanded] = useState(false);

  const toggleCollapse = () => {
    setExpanded(!isExpanded);
  };
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (

    <div className="p-4 xl:ml-80 flex items-center justify-center max-w-screen" >
      <div className='p-4 w-full bg-white shadow-lg'>
        
        <Accordion >
          {locaciones.map((ubicacion) => (
            <AccordionItem key={ubicacion.locacion} aria-label={ubicacion.locacion} title={ubicacion.locacion}
              className='w-full shadow-lg rounded-lg border border-gray-200 px-3 py-1 hover:shadow-xl transition-all duration-200 bg-gray-200 mb-4'>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1 mb-4">

                {camerasPorLocacion[ubicacion.locacion]?.map((camera) => (
                  <button
                    key={camera}
                    className="flex items-center text-white border border-gray-900 justify-center w-16 h-16 bg-gray-500 rounded-full hover:bg-red-400 font-bold transition-all duration-200"
                    onClick={() => handleOpenModal(camera)}

                  >
                    {camera}
                  </button>

                ))}
              </div>
            </AccordionItem>
          ))}

        </Accordion>
      </div>
      {/* <div className="text-sm text-black flex flex-col justify-center w-full  bg-white p-6 shadow-lg rounded border border-gray-300">
        <div className='flex justify-left '>
          <div className="relative text-gray-600 focus-within:text-black rounded ">
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
              className='py-2 pl-10 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in'
              placeholder='Buscar'
            />
          </div>
        </div> */}

      {/* <div className="grid gap-4 w-full mt-5">

          {locaciones.map((ubicacion) => (
            <div
              key={ubicacion.locacion}
              className={`p-4 text-zinc-800 border border-gray-300 shadow-md rounded bg-background-color transition duration-200 ease-in-out ${ubicacionSeleccionada !== ubicacion.locacion ? ' hover:shadow-lg transition-transform hover:text-black  cursor-pointer duration-200 ease-in-out' : ''}`}
              onClick={ubicacionSeleccionada === ubicacion.locacion ? null : () => handleClick(ubicacion.locacion)}
            >

              <div onClick={ubicacionSeleccionada === ubicacion.locacion ? handleClose : null} className={`flex justify-between ${ubicacionSeleccionada === ubicacion.locacion ? 'cursor-pointer transition duration-100 ease-in-out text-black border-b border-gray-300 ' : ''}`}>
                <div className='flex gap-4 w-full items-center'>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                  >
                    {ubicacionSeleccionada === ubicacion.locacion ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                  <h2 className={`py-2  text-sm ${ubicacionSeleccionada === ubicacion.locacion ? 'cursor-pointer' : ''}`}>
                    {ubicacion.locacion}
                  </h2>

                </div>

              </div>
              {ubicacionSeleccionada === ubicacion.locacion && (
                <div className="w-full pt-5 pb-2">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-4">
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
        </div> */}
      {botonSeleccionado && (
        <Overlay numero={botonSeleccionado} locacion={ubicacionSeleccionada} onClose={() => setBotonSeleccionado(null)} />
      )}
      {/* </div> */}
    </div>


  );
}