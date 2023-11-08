import React, { useState } from "react";
import Link from "../Apiconf";
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from "@material-tailwind/react";
import { correcta, incorrecta } from "../Toast/Notificaciones";
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
                        <th className="p-3 px-5">
                        </th>
                        <th className="p-3 px-5">
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Camara
                            </Typography>
                        </th>
                        <th className="p-3 px-5">
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Fecha
                            </Typography>
                        </th>
                        <th className="p-3 px-5" >
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Evento
                            </Typography>
                        </th>
                        <th className="p-3 px-5" >
                            <Typography
                                variant="small"
                                className="text-[11px] uppercase text-gray-600"
                            >
                                Descripcion
                            </Typography>
                        </th>
                        <th className="p-3 px-5" >
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
                                <motion.tr key={dato.id} className="hover:bg-gray-100 transition-all duration-100"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}>

                                    <motion.td className="max-w-xs truncate border-b p-4 px-5">
                                        <p className="block antialiased font-sans leading-normal text-sm text-gray-600 ">
                                            {(() => {
                                                const fechaRegistro = new Date(dato.fecha);
                                                const fechaActual = new Date();
                                                const diferenciaMilisegundos = fechaActual - fechaRegistro;
                                                const segundos = Math.floor(diferenciaMilisegundos / 1000);
                                                const minutos = Math.floor(segundos / 60);
                                                const horas = Math.floor(minutos / 60);
                                                const dias = Math.floor(horas / 24);
                                                const meses = (fechaActual.getFullYear() - fechaRegistro.getFullYear()) * 12 + (fechaActual.getMonth() - fechaRegistro.getMonth());
                                                if (meses >= 1) {
                                                    return `Hace ${meses} mes${meses === 1 ? '' : 'es'}`;
                                                } else if (dias >= 1) {
                                                    return `Hace ${dias} día${dias === 1 ? '' : 's'}`;
                                                } else {
                                                    return `Hace ${horas} hora${horas === 1 ? '' : 's'}`;
                                                }
                                            })()}
                                        </p>
                                    </motion.td>


                                    <motion.td className="max-w-xs truncate border-b p-4 px-5">
                                        <p className="block antialiased font-sans leading-normal text-sm text-gray-600 ">{dato.id_camara}</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b  p-4 px-5 ">
                                        <p className="block antialiased font-sans text-sm leading-normal text-gray-600">{new Date(dato.fecha).toLocaleString('es-ES', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b p-4 px-5">
                                        <span className="text-sm px-2 py-1 rounded-lg " style={{ backgroundColor: [dato.color] || '#989898' }}>{dato.tipo}</span>
                                    </motion.td>
                                    <motion.td className="w-full border-b border-blue-gray-50 p-4 px-5">
                                        {showFullDescription[dato.id] ? (
                                            // Mostrar descripción completa
                                            <>
                                                <p className="block antialiased leading-normal font-sans text-gray-600">
                                                    {dato.descripcion}
                                                </p>
                                                {dato.descripcion.length > 200 && (
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
                                                <p className="block antialiased leading-normal font-sans text-gray-600">
                                                    {dato.descripcion.length > 200
                                                        ? dato.descripcion.slice(0, 200) + "..."
                                                        : dato.descripcion}
                                                </p>
                                                {dato.descripcion.length > 200 && (
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

                                    <motion.td className="max-w-xs truncate border-b p-4 px-5">
                                        <p className="block antialiased text-sm font-sans text-gray-600">No</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-blue-gray-50">
                                        <div className="flex align-center mr-1">
                                            <button className=' text-blue-500  py-1 px-2 rounded hover:bg-blue-100 transition-all duration-200 relative '
                                                onClick={() => handleEditClick(dato)}>
                                                <Typography
                                                    className="text-xs font-semibold opacity-90"
                                                >
                                                    Añadir información
                                                </Typography>
                                            </button>
                                            {/* <button className=' text-red-500 font-semibold py-1 px-2 rounded text-xs hover:bg-red-100 transition-all duration-200 relative '
                                                onClick={() => handleDelete(dato.id)}>
                                                <Typography
                                                    className="text-xs font-semibold  opacity-90"
                                                >
                                                    Eliminar
                                                </Typography>
                                            </button> */}
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
