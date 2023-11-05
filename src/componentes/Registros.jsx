import React from 'react';
import { useState, useEffect } from 'react';
import Link from '../Apiconf';
import { Link as ReactLink } from 'react-router-dom';
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Nav from './Nav';
export default function Registros() {
  const [locaciones, setLocaciones] = useState([]);
  const [camaras, setCamaras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      {!isLoading ? (
        <div className="p-4 xl:ml-80  justify-center max-w-screen" >
          <Nav></Nav>
          <div className='text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded  mt-3'>
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
                className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition  duration-200 ease-in`}
                placeholder='Buscar'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className='w-full bg-background-color py-10 px-5 rounded mt-5 border border-gray-300 '>
              <Accordion hideIndicator >
                {locaciones.map((ubicacion) => (
                  <AccordionItem
                    key={ubicacion.locacion}
                    aria-label={ubicacion.locacion}
                    title={
                      <div className='flex gap-2 items-center h-6'>
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
                    className='w-full  rounded-lg font-sans px-3 py-1 hover:shadow-xl transition-all duration-200  mb-4  text-base bg-white text-black border border-zinc-300 leading-relaxed shadow-lg'
                  >
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1 mb-4 px-11">

                      {camerasPorLocacion[ubicacion.locacion]?.map((camera) => (
                        <ReactLink to={`/registros/camara/${camera}`}>
                          <button
                            key={camera}
                            className={`focus:outline-none shadow-gray-500/40 shadow-lg flex items-center text-white justify-center w-16 h-16 bg-gray-500 rounded-lg hover:bg-red-400 font-bold transition-all duration-200 `}

                          >
                            {camera}
                          </button>
                        </ReactLink>
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}