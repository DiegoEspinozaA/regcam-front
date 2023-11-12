import React from 'react';
import { useState, useEffect } from 'react';
import Link from '../Apiconf';
import { Link as ReactLink } from 'react-router-dom';
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Nav from '../componentes/Navbar';
import { Button } from '@material-tailwind/react';
import { useAppContext } from '../AppContext';


export default function Registros() {
  const [locaciones, setLocaciones] = useState([]);
  const [camaras, setCamaras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {state, dispatch } = useAppContext();




  useEffect(() => {
    fetch(Link + '/camaras')
      .then(res => res.json())
      .then(data => {
        setCamaras(data);
      })
      .catch(error => {
      });

    fetch(Link + '/locaciones')
      .then(res => res.json())
      .then(data => {
        setLocaciones(data);
        setIsLoading(false)
      })
      .catch(error => {
      });
  }, [])


  const camerasPorLocacion = {};

  camaras.forEach(camera => {
    const locacion = camera.locacion;
    if (!camerasPorLocacion[locacion]) {
      camerasPorLocacion[locacion] = [];
    }
    camerasPorLocacion[locacion].push(camera.id);
  });





  const [openLocation, setOpenLocation] = useState(null);
  const toggleLocation = (locacion) => {
    if (openLocation === locacion) {
      setOpenLocation(null);
    } else {
      setOpenLocation(locacion);
    }
  };

  const [busqueda, setBusqueda] = useState(null);

  return (
    <>
      <div className="p-4  xl:ml-80  h-[calc(96vh-32px)]  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 " >
        <Nav></Nav>
        <div className='text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl  mt-3'>
        <p className='text-xl font-bold text-gray-700 font-base mb-5'>Registros</p>
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
                    className="py-2 pl-10 focus:ring-1 text-sm focus:outline-none border rounded border-gray-300 transition duration-200 "
                    placeholder='Buscar'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>
        
            <div className="mt-5 w-full rounded-lg shadow-lg h-[calc(100vh-245px)] border border-gray-200 bg-gray-100">
            {!isLoading ? (
              <div className="overflow-y-auto scrollbar-container bg-transparent max-h-full p-6">
                
                <Accordion hideIndicator >
                  {locaciones.map((ubicacion) => (
                    <AccordionItem
                      key={ubicacion.locacion}
                      aria-label={ubicacion.locacion}
                      title={
                        <div className='flex w-full items-center'>
                          {openLocation === ubicacion.locacion ? (
                            <IconButton >
                              <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                            </IconButton>


                          ) : (
                            <IconButton>
                              <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                            </IconButton>
                          )}
                          <h1>{ubicacion.locacion}</h1>
                        </div>
                      }
                      onPress={() => toggleLocation(ubicacion.locacion)}
                      className='w-full rounded-lg  p-1 hover:shadow-md transition-all duration-200 mb-3  text-base bg-white border border-zinc-200 shadow-sm'
                    >
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1 mb-3 px-11">

                        {camerasPorLocacion[ubicacion.locacion]?.map((camera) => (
                          <ReactLink to={`/registros/camara/${camera}`} key={camera}>
                            <Button
                              key={camera}
                              className={`focus:outline-none shadow-gray-500/40 shadow-lg flex items-center text-white justify-center w-14 h-14 bg-gray-500 rounded-lg hover:bg-red-400 transition-all duration-200 `}

                            >
                              <p className='text-lg semibold '>{camera}</p>
                            </Button>
                          </ReactLink>
                        ))}
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
                  ) : (
                    <></>
                  )}
            </div>
      
        </div>
      </div>

    </>
  );
}