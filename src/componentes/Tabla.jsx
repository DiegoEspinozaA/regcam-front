import React from "react";
import { useState } from "react";
import Link from "../Apiconf";
import { motion, AnimatePresence } from 'framer-motion';

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
                    console.log('Registro eliminado exitosamente.');
                } else {
                    console.error('Error al eliminar el registro.');
                }
            })
            .catch((error) => {
                console.error('Error de red:', error);
            });
    };


    const headerCellStyle = {
        padding: "0.75rem 1.25rem",

    };

    const cellStyle = {
        padding: "1rem 1.25rem",
    };

    const handleEditClick = (registro) => {
        setEditingRegistro(registro);
        setEditModalOpen(true);
    };

    return (
        <>
            <table>
                <thead>
                    <tr className="sticky top-0 bg-white text-left z-40">

                        <th style={headerCellStyle}>
                            <p className="block antialiased font-sans text-xs font-semibold uppercase text-zinc-600 mb-1">Camara</p>
                        </th>
                        <th style={headerCellStyle}>
                            <p className="block antialiased font-sans text-xs font-semibold uppercase text-zinc-600 mb-1">Fecha</p>
                        </th>
                        <th style={headerCellStyle} >
                            <p className="block antialiased font-sans text-xs font-semibold uppercase text-zinc-600 mb-1">Evento</p>
                        </th>
                        <th style={headerCellStyle} >
                            <p className="block antialiased font-sans text-xs font-semibold uppercase text-zinc-600 mb-1">Descricipcion</p>
                        </th>
                        <th style={headerCellStyle} >
                            <p className="block antialiased font-sans text-xs font-semibold uppercase text-zinc-600 mb-1">Notificado</p>
                        </th>
                        <th style={headerCellStyle} ></th>
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
                                    <motion.td className="max-w-xs truncate border-b border-blue-gray-50" style={cellStyle}>
                                        <div className="flex items-center gap-4 ">
                                            <div>
                                                <p className="block antialiased font-sans leading-normal text-sm text-blue-gray-900 ">{dato.id_camara}</p>
                                            </div>
                                        </div>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-blue-gray-50 p-10" style={cellStyle}>
                                        <div className="flex items-center gap-4 ">
                                            <div>
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900">{dato.fecha}</p>
                                            </div>
                                        </div>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b  border-blue-gray-50" style={cellStyle}>
                                        <span className="text-sm px-2 py-1 rounded-lg " style={{ backgroundColor: [dato.color] || '#989898' }}>{dato.tipo}</span>
                                    </motion.td>

                                    <motion.td style={cellStyle} className="w-full border-b  border-blue-gray-50">
                                        <p className="block antialiased font-sans text-blue-gray-600">{dato.descripcion}</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-blue-gray-50" style={cellStyle}>
                                        <p className="block antialiased text-sm font-sans text-blue-gray-600">No</p>
                                    </motion.td>

                                    <motion.td className="max-w-xs truncate border-b border-blue-gray-50">
                                        <div className="flex align-center mr-1">
                                                <button className=' text-blue-500 font-semibold py-1 px-2 rounded text-xs hover:bg-blue-100 transition-all duration-200 relative '
                                                    onClick={() => handleEditClick(dato)}>
                                                    Editar
                                                </button>
                                            <button className=' text-red-500 font-semibold py-1 px-2 rounded text-xs hover:bg-red-100 transition-all duration-200 relative '
                                                onClick={() => handleDelete(dato.id)}>
                                                Eliminar
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
