import Nav from "../componentes/Navbar"
import React, { useEffect, useState } from "react";
import Link from "../Apiconf";
import { Accordion, AccordionItem } from "@nextui-org/react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useParams } from "react-router-dom";
export default function Historial() {
    const { id_registro } = useParams();
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        fetch(Link + '/historial/' + id_registro)
            .then(response => response.json())
            .then(data => {
                setHistorial(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])

    const registrosPorFecha = {};
    historial.forEach(registro => {
        const fechaModificacion = new Date(registro["fecha_modificacion"]);
        const fechaClave = new Date(fechaModificacion);
        const dia = fechaClave.getDate();
        const mes = fechaClave.toLocaleString('es-ES', { month: 'long' });
        const año = fechaClave.getFullYear();
        const fechaFormateada = `${dia} de ${mes} de ${año}`;
        if (registrosPorFecha[fechaFormateada]) {
            registrosPorFecha[fechaFormateada].push(registro);
        } else {
            registrosPorFecha[fechaFormateada] = [registro];
        }
    });


    const [selectedCambio, setSelectedCambio] = useState(null);


    const toggleCambio = (fecha) => {
        if (selectedCambio === fecha) {
            setSelectedCambio(null);
        } else {
            setSelectedCambio(fecha);
        }
    };

    return (
        <>
            <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4 max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 '>
                <Nav></Nav>
                <div className='text-sm  text-gray-800 flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl  mt-3 '>
                    <p className='text-xl font-bold text-gray-700 font-base mb-5'>Registro {id_registro}</p>
                    <p className='text-lg font-bold text-gray-600 font-base ml-1'>Estado actual </p>
                    <div className="py-2 px-3 rounded-lg bg-blue-100 shadow-md">
                        <div className="">
                            <div className="flex gap-1 mb-1">
                                <label className="font-bold text-[14px] text-gray-700">Camara:</label>
                                <p>asdasdkask</p>
                            </div>


                            <div className="flex gap-1 mb-1">
                                <label className="font-bold text-[14px] text-gray-700">Fecha:</label>
                                <p>asdasdkask</p>
                            </div>

                            <div className="flex gap-1 mb-1">

                                <label className="font-bold text-[14px] text-gray-700">Evento:</label>
                                <p>Asalto</p>
                            </div>
                            <div className="flex gap-1 mb-1">

                                <label className="font-bold text-[14px] text-gray-700">Notificado:</label>
                                <p>No</p>
                            </div>

                        </div>
                        <div className="">
                            <label className="font-bold text-gray-700">Descripcion</label>
                            <p>Lorem pasdjaskdm lkasdlk asjlkdasjdlk sajlkdjas lkdjaslkd</p>
                        </div>

                    </div>
                    <p className='text-lg font-bold text-gray-600 font-base mt-5 ml-1'>Historial</p>
                    <div className="mt-5 w-full rounded-lg shadow-md border border-gray-200">

                        <div className=" overflow-y-auto scrollbar-container bg-white max-h-[calc(100vh-430px)]  px-6 justify-center ">
                            <div className=" w-full ">
                                {Object.entries(registrosPorFecha).map(([fecha, registros]) => (
                                    <div key={fecha} >
                                        <div class="TimelineItem pt-5 pb-5">
                                            <div className=" w-[2rem] flex text-center items-center h-[1rem] ml-[-0.45rem] bg-white z-20">
                                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500">
                                                    <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                                                </svg>
                                            </div>
                                            <div class="mt-[-0.20rem] w-full">
                                                <h2 class="text-md px-2">Cambios registrados el {fecha}</h2>
                                                <Accordion hideIndicator >
                                                    {registros.map((cambio) => (
                                                        <AccordionItem
                                                            key={cambio.ID}
                                                            aria-label={cambio.ID}
                                                            title={
                                                                <div className='flex w-full px-1 py-1 items-center h-5 '>
                                                                    <div className="flex items-center">
                                                                        {selectedCambio === fecha ? (
                                                                            <IconButton
                                                                            >
                                                                                <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                                                            </IconButton>


                                                                        ) : (
                                                                            <IconButton>
                                                                                <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                                                                            </IconButton>
                                                                        )}
                                                                        <div className="flex gap-1 items-center align-bottom ">
                                                                            <p className="font-bold text-[14px] text-gray-600">Diego Espinoza</p>
                                                                            <p className="text-xs ali">Cambio realizado a las {new Date(cambio.fecha_modificacion).toLocaleDateString('es-CL', {
                                                                                hour: "numeric",
                                                                                minute: "numeric",
                                                                            }).split(' ')[1]} hrs</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            }
                                                            onPress={() => toggleCambio(fecha)}
                                                            className='w-full mt-3 shadow-md outline-none rounded-lg  hover:shadow-md transition-all duration-200 mb-3 hover:bg-gray-300 text-base bg-gray-200 border border-gray-300 '
                                                        >
                                                            <div className="px-11">
                                                                <div className="flex gap-1 mb-1">
                                                                    <label className="font-bold text-[14px] text-gray-700">Camara:</label>
                                                                    <p>{cambio.id_camara}</p>
                                                                </div>


                                                                <div className="flex gap-1 mb-1">
                                                                    <label className="font-bold text-[14px] text-gray-700">Fecha:</label>
                                                                    <p >{new Date(cambio.fecha).toLocaleString('es-ES', {
                                                                        year: 'numeric',
                                                                        month: 'numeric',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })}</p>
                                                                </div>

                                                                <div className="flex gap-1 mb-1">

                                                                    <label className="font-bold text-[14px] text-gray-700">Evento:</label>
                                                                    <p>{cambio.tipo}</p>
                                                                </div>
                                                                <div className="flex gap-1 mb-1">

                                                                    <label className="font-bold text-[14px] text-gray-700">Notificado:</label>
                                                                    <p>No</p>
                                                                </div>

                                                                <div className="flex gap-1 mb-1">

                                                                    <label className="font-bold text-[14px] text-gray-700">Descripcion</label>
                                                                    <p>{cambio.descripcion}</p>
                                                                </div>

                                                            </div>
                                                      
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                <div class="TimelineItem pt-2 pb-2 ">
                                    <div className=" w-[2rem] flex text-center items-center h-[1rem] ml-[-0.45rem] bg-white z-20">
                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" className="fill-gray-500">
                                            <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                                        </svg>
                                    </div>
                                    <div class="TimelineItem-body mt-[-0.20rem]">
                                        <h2 class="px-3">Fin de los cambios para este registro</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}