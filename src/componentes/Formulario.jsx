import React, { useEffect, useState } from 'react';
import Link from '../Apiconf';
import Nav from './Nav';
import Tabla from './Tabla';
import AgregarEvento from './AgregarEvento';
import EditarRegistro from './EditarRegistro';



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

            <div className='p-4  xl:ml-80  h-[calc(96vh-32px)]  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0 '>
                <Nav></Nav>
                <div className='text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded  mt-3'>
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

                                    {busqueda.length > 0 && (
                                        <button
                                            className='ml-2 text-red-400 font-bold py-1 px-2  text-xs rounded  hover:bg-red-100 transition-all duration-200'
                                            onClick={() => setBusqueda('')}
                                        >
                                            Borrar
                                        </button>
                                    )}

                                </div>
                            </div>
                            <div>
                                <button className="bg-blue-500 justify-center shadow-lg hover:bg-blue-700 hover:bg-blue-gray text-gray-200 font-bold text-md py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                    onClick={() => setShowModal(true)}>
                                    <p>Agregar Evento</p>
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="mt-5 w-full rounded-lg shadow-md h-[82vh] border border-gradient from-red-500 via-purple-500 to-blue-500">
                        <div className="overflow-y-auto scrollbar-container bg-white max-h-full mt-1">
                            <Tabla registros={registros} setRegistros={setRegistros} busqueda={busqueda} setEditingRegistro={setEditingRegistro} setEditModalOpen={setEditModalOpen}></Tabla>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Formulario;
