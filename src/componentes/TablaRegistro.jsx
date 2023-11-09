import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function TablaRegistros(props) {
    const { registros } = props;
    const { id } = props;
    return (
        <table>
            <thead>
                <tr className="sticky top-0 bg-white text-left z-40">
                    <th className="p-3 px-5">
                        <Typography
                            variant="small"
                            className="text-[11px] uppercase text-gray-600"
                        >
                            Fecha
                        </Typography>
                    </th>
                    <th className="p-3 px-5">
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
                        .map((registro) => (
                            <motion.tr key={registro.id} className="hover:bg-gray-100 transition-all duration-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}>
                                <motion.td className="max-w-xs truncate border-b border-blue-gray-50 p-4 px-5" >
                                    <p className="block antialiased font-sans text-sm leading-normal text-gray-600">{new Date(registro.fecha).toLocaleString('es-ES', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</p>

                                </motion.td>

                                <motion.td className="max-w-xs truncate border-b  border-blue-gray-50 p-4 px-5">
                                    <span className="text-sm px-2 py-1 rounded-lg " style={{ backgroundColor: [registro.color] || '#989898' }}>{registro.tipo}</span>
                                </motion.td>

                                <motion.td className="w-full border-b  border-blue-gray-50 p-4 px-5">
                                    <p className="block antialiased font-sans text-gray-600 ">{registro.descripcion}</p>
                                </motion.td>

                                <motion.td className="max-w-xs truncate border-b border-blue-gray-50 p-4 px-5" >
                                    <p className="block antialiased text-sm font-sans text-gray-600">No</p>
                                </motion.td>

                                <motion.td className="max-w-xs truncate border-b border-blue-gray-50 ">
                                    <div className="flex align-center mr-1">
                                        <button className=' text-blue-400  py-1 px-2 rounded font-semibold text-xs hover:bg-blue-100 transition-all duration-200 relative '
                                        >
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
                                        <Link to={`/registros/camara/${id}/historial/${registro.id}`}>
                                            <button className='flex gap-1 items-center text-blue-400 font-semibold py-1 px-2 rounded text-xs hover:bg-blue-100 transition-all duration-200 relative '
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 8l0 4l2 2" />
                                                    <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                                                </svg>
                                                Historial
                                            </button>
                                        </Link>
                                    </div>
                                </motion.td>
                            </motion.tr>
                        ))}
                </AnimatePresence>
            </tbody>
        </table>
    );
}
