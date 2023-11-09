import React, { useState } from "react";
import Link from "../Apiconf";
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from "@material-tailwind/react";
import { correcta, incorrecta } from "../Toast/Notificaciones";
import { FcAssistant } from "react-icons/fc";
import { PiUserCircleFill } from 'react-icons/pi'
export default function Tabla(props) {
    const { setEditingRegistro } = props;
    const { registros } = props;
    const { setRegistros } = props;
    const { setEditModalOpen } = props;


    const handleDelete = (id) => {
        console.log(id);
        setRegistros(registros.filter((item) => item.id !== id));
        fetch(Link + '/eliminarRegistro/' + id, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    correcta("Registro eliminado exitosamente.");
                } else {
                    incorrecta("Error al eliminar el registro.");
                }
            })
            .catch((error) => {
                incorrecta("Error en el servidor: " + error);
            });
    };

    const handleEditClick = (registro) => {
        setEditingRegistro(registro);
        setEditModalOpen(true);
    };

    const [showFullDescription, setShowFullDescription] = useState({});

    const toggleShowDescription = (id) => {
        setShowFullDescription(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };



    return (
        <>
            <table >
                <thead>
                    <tr className="sticky top-0 bg-white text-left z-40">
                        <th className="p-3 px-5 text-center">
                        </th>
                        <th className="p-3 px-5 text-center">
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Responsable
                            </Typography>
                        </th>

                        <th className="p-3 px-5 text-center">
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Camara
                            </Typography>
                        </th>
                        <th className="p-3 px-5 text-center">
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Fecha
                            </Typography>
                        </th>
                        <th className="p-3 px-5  text-center" >
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Evento
                            </Typography>
                        </th>
                        <th className="p-3 px-5 " >
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Descripcion
                            </Typography>
                        </th>
                        <th className="p-3 px-5 text-center" >
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Notificado
                            </Typography>
                        </th>
                        <th className="p-3 px-5" ></th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence initial={false}>
                        {registros
                            .map((dato) => (
                                <motion.tr key={dato.id} className="hover:bg-gray-100 transition-all duration-100 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>

                                    <motion.td className="max-w-xs truncate border-b  border-gray-200 p-3 px-5 text-center">
                                        <p className="block antialiased  leading-normal text-sm text-gray-600 ">
                                            hace un momento
                                        </p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-l border-gray-200  p-3 px-5 text-center">
                                        <p className=" items-center antialiased  leading-normal text-sm text-gray-600 flex gap-2">
                                            <PiUserCircleFill
                                                className="w-7 h-7 text-gray-500"></PiUserCircleFill>
                                            Diego Espinoza
                                        </p>
                                    </motion.td>


                                    <motion.td className="max-w-xs truncate border-b border-l border-gray-200 p-3 px-5 text-center">
                                        <p className="block antialiased  leading-normal text-sm text-gray-600 ">{dato.id_camara}</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-l border-gray-200 p-3 px-5 text-center">
                                        <p className="block antialiased  text-sm leading-normal text-gray-600">{new Date(dato.fecha).toLocaleString('es-ES', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-l border-gray-200  p-3 px-5 text-center" style={{ backgroundColor: [dato.color] || '' }}>
                                        <span className="text-sm px-2 py-1 rounded-lg" >{dato.tipo}</span>
                                    </motion.td>
                                    <motion.td className="w-full border-b border-l border-gray-200 p-4 px-5 text-left">
                                        {showFullDescription[dato.id] ? (
                                            <>
                                                <p className="block antialiased leading-normal  text-gray-600">
                                                    {dato.descripcion}
                                                </p>
                                                {dato.descripcion.length > 150 && (
                                                    <button
                                                        className="text-blue-500 text-xs font-semibold hover:underline cursor-pointer"
                                                        onClick={() => toggleShowDescription(dato.id)}
                                                    >
                                                        Ver menos
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            // Mostrar descripción recortada con botón para ver más
                                            <>
                                                <p className="block antialiased leading-normal  text-gray-600">
                                                    {dato.descripcion.length > 150
                                                        ? dato.descripcion.slice(0, 150) + "..."
                                                        : dato.descripcion}
                                                </p>
                                                {dato.descripcion.length > 150 && (
                                                    <button
                                                        className="text-blue-500 text-xs font-semibold hover:underline cursor-pointer"
                                                        onClick={() => toggleShowDescription(dato.id)}
                                                    >
                                                        Ver más
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-l border-gray-200 p-3 px-5">
                                        <p className="block antialiased text-sm  text-gray-600">No</p>
                                    </motion.td>

                                    <motion.td className="max-w-md truncate border-b border-l border-gray-200 p-3 px-3">
                                        <div className="flex align-center mr-1 gap-1">

                                            <button className='text-blue-400  py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative '
                                            >

                                                <div className="flex gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                                    </svg>
                                                    <p>Ver más</p>

                                                </div>
                                            </button>

                                            <button className='text-blue-400  py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative '
                                                onClick={() => handleEditClick(dato)}>

                                                <div className="flex gap-1">

                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-rotate-2" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5" />
                                                        <path d="M18.37 7.16l0 .01" />
                                                        <path d="M13 19.94l0 .01" />
                                                        <path d="M16.84 18.37l0 .01" />
                                                        <path d="M19.37 15.1l0 .01" />
                                                        <path d="M19.94 11l0 .01" />
                                                    </svg>
                                                    <p>Actualizar información</p>
                                                </div>

                                            </button>


                                            <button className=' text-red-500 font-semibold py-1 px-2 rounded text-xs hover:bg-red-100 transition-all duration-200 relative '
                                                onClick={() => handleDelete(dato.id)}>
                                                <Typography
                                                    className="text-xs font-semibold  opacity-90"
                                                >
                                                    Eliminar
                                                </Typography>
                                            </button>
                                        </div>
                                    </motion.td>
                                </motion.tr>
                            ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </>
    );
}
