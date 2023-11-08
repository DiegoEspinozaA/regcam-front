import React, { useEffect, useState } from 'react';
import Link from '../Apiconf';
import Nav from '../componentes/Navbar';
import TablaRecientes from '../componentes/TablaRecientes';
import AgregarEvento from '../forms/AgregarEvento';
import EditarRegistro from '../forms/EditarRegistro';
import { Button } from "@material-tailwind/react";

const Formulario = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [tiposEventos, setTiposEventos] = useState([]);
    const getEventos = async () => {
        fetch(Link + '/tiposEventos')
            .then((response) => response.json())
            .then((data) => setTiposEventos(data));
    }

    const getRegistros = async () => {
        fetch(Link + '/registros')
            .then(response => response.json())
            .then(data => {
                setRegistros(data);
                setIsLoading(false);
            })
            .catch(error => {
            });
    }

    useEffect(() => {
        getEventos();
    }, [])


    useEffect(() => {
        getRegistros();
    }, [])

    const [registros, setRegistros] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingRegistro, setEditingRegistro] = useState(null);

    return (
        <>
            <AgregarEvento
                showModal={showModal}
                setShowModal={setShowModal}
                tiposEventos={tiposEventos}
                setRegistros={setRegistros}
                getRegistros={getRegistros}
                registros={registros}
            />
            <EditarRegistro
                setEditModalOpen={setEditModalOpen}
                isEditModalOpen={isEditModalOpen}
                tiposEventos={tiposEventos}
                setRegistros={setRegistros}
                getRegistros={getRegistros}
                registro={editingRegistro}
            />
            <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 '>
                <Nav></Nav>
                <div className='text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl  mt-3'>
                    <p className='text-xl font-bold text-gray-700 font-base mb-5'>Recientes</p>
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
                                        className="py-2 pl-10 pr-10 focus:ring-1 text-sm focus:outline-none border rounded border-gray-300 transition duration-200 w-[300px]"
                                        placeholder='Buscar'
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />

                                    <div className='absolute right-0 inset-y-0 flex items-center p-2'>
                                        {busqueda.length > 0 && (
                                            <Button
                                                className=' bg-gray-300 right-0 inset-y-0 border border-gray-300 p-[2px] text-xs rounded-full  hover:bg-gray-400 hover:border hover:border-gray-600 transition-all duration-200 '
                                                onClick={() => setBusqueda('')}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M18 6l-12 12" />
                                                    <path d="M6 6l12 12" />
                                                </svg>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button className="gap-2 bg-green-600 justify-center shadow-lg hover:bg-green-500 text-gray-200 py-2 px-5 rounded flex items-center transition duration-200 ease-in border "
                                    onClick={() => setShowModal(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    <p>
                                        Agregar Evento
                                    </p>
                                </Button>
                            </div>
                        </div>
                    </div>
                    {!isLoading ? (
                        <div className="mt-5 w-full rounded-lg shadow-lg h-[calc(100vh-250px)] border border-gray-200">
                            <div className="overflow-y-auto scrollbar-container bg-white max-h-full mt-1">
                                <TablaRecientes registros={registros} setRegistros={setRegistros} busqueda={busqueda} setEditingRegistro={setEditingRegistro} setEditModalOpen={setEditModalOpen}></TablaRecientes>
                            </div>
                        </div>) : (<></>)}
                </div>
            </div>
        </>
    );
}

export default Formulario;
