import React, { useEffect, useState } from 'react';
import { correcta, incorrecta } from '../Toast/Notificaciones';
import Link from '../Apiconf';
import Scrollbar from 'smooth-scrollbar';
import { updateData } from '../fetchApi';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import Row from './Row';
import Add from '@mui/icons-material/Add';
const Formulario = () => {
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
                const registrosConFechasFormateadas = data.map(registro => {
                    const fechaFormateada = new Date(registro.fecha)
                        .toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })
                        .replace(/\//g, '-');

                    return {
                        ...registro,
                        fecha: fechaFormateada
                    };
                });

                setRegistros(registrosConFechasFormateadas);
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
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');
    const buscarActivado = !minimo && !maximo;
    const minMaxActivados = !busqueda;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const scrollbarContainer = document.querySelector('.scrollbar-container');
        const scrollbar = Scrollbar.init(scrollbarContainer);
        return () => {
            scrollbar.destroy();
        };
    }, []);

    // const handleDelete = (id) => {
    //     setRegistros(registros.filter((item) => item.id !== id));
    //     fetch(Link + '/eliminarRegistro/' + id, {
    //         method: 'DELETE',
    //     })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log('Registro eliminado exitosamente.');
    //             } else {
    //                 console.error('Error al eliminar el registro.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error de red:', error);
    //         });
    // };


    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(registros.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = registros.slice(startIndex, endIndex);



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSetItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);

    };


    //Parte al seleccionar una fila
    const [expandedRow, setExpandedRow] = useState(null);
    const [activeTab, setActiveTab] = useState('Ver');
    const handleVerFila = (rowId) => {
        if (expandedRow === rowId) {
            // Si la fila ya está expandida, ciérrala haciendo clic nuevamente
            setCurrentRegistro(initialRegistroState)
            setExpandedRow(null);
            setActiveTab('Ver');
        } else {
            // Si la fila no está expandida, ábrela
            setCurrentRegistro(currentData.find((dato) => dato.id === rowId));
            setExpandedRow(rowId);
        }
    };
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const initialRegistroState = useState({
        id: '',
        fecha: '',
        tipo: '',
        descripcion: '',
    })
    const [currentRegistro, setCurrentRegistro] = useState(initialRegistroState);
    const handleEditarDato = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCurrentRegistro((prevRegistro) => ({
            ...prevRegistro,
            [name]: value
        }));
    };

    const handleSubmitEditRow = (e) => {
        e.preventDefault();
        setRegistros((registros) => {
            return registros.map((registro) => {
                if (registro.id === currentRegistro.id) {
                    return currentRegistro;
                } else {
                    return registro;
                }
            });
        });

        updateData('actualizarRegistro', currentRegistro.id, currentRegistro);
        setActiveTab('Ver');
    }

    const [showModal, setShowModal] = useState(false);


    const [formData, setFormData] = useState({
        id: '',
        tipo: 'Asalto',
        fecha: '',
        descripcion: '',
        locacion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            id: '',
            tipo: 'Asalto',
            fecha: '',
            descripcion: '',
            locacion: '',
        });
    }

    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fechaChileISO = new Date().toLocaleString('sv-SE', { timeZone: 'America/Santiago' });
        const fechaFormateada = new Date().toLocaleDateString('es-ES', {}).replace(/\//g, '-')

        const newFormData = {
            ...formData,
            fecha: fechaChileISO,
        };

        const auxFormData = {
            ...formData,
            fecha: fechaFormateada

        }

        setFormData(newFormData);
        setRegistros([auxFormData, ...registros]);
        const postResponse = await fetch(Link + '/guardarRegistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFormData),
        });
        if (postResponse.ok) {
            correcta('Evento registrado correctamente');
        } else {
            incorrecta('Ha ocurrido un error');
        }
        getRegistros();
    };


    return (
        <div className='flex justify-center w-full max-w-screen '>

            <div className="text-sm mt-5 text-black flex flex-col justify-center w-[80%] bg-white p-6 shadow-lg rounded border border-gray-300 ">
                <div className='flex'>
                    <div className="flex text-gray-600 justify-between w-full">
                        <div>
                            <div className='w-full mb-4'>
                                <h1 className='text-xl tracking-wider text-black font-bold'>Recientes</h1>

                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <svg class="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                    placeholder='Buscar'
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    disabled={!buscarActivado}
                                />

                                {busqueda.length > 0 && (
                                        <IconButton
                                        aria-label="edit button"
                                        size="small"
                                        onClick={setBusqueda('')}
                                    >
                                       <CloseIcon /> 
                                    </IconButton>
                                )}

                            </div>
                        </div>
                        <div>
                            <button class="bg-blue-500 justify-center hover:bg-blue-700 text-gray-200 font-bold text-xl py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                onClick={() => setShowModal(true)}>
                               <AddIcon />
                                <span className='ml-1'>Agregar</span>
                            </button>
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div class="relative w-full max-w-md max-h-full">
                                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal"
                                                    onClick={handleCloseModal}
                                                >
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                </button>
                                                <div class="px-6 py-6 lg:px-8">
                                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Registrar Evento</h3>
                                                    <form class="space-y-6" action="#">
                                                        <div>
                                                            <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Camara</label>
                                                            <input
                                                                type="text"
                                                                name="id"
                                                                id="id"
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                placeholder="Ingresa el ID de la camara"
                                                                required
                                                                onChange={handleChange}
                                                            >

                                                            </input>
                                                        </div>
                                                        <div>
                                                            <label for="tipo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de evento</label>
                                                            <select
                                                                name="tipo"
                                                                id="tipo"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                required
                                                                onChange={handleChange}

                                                            >
                                                                {tiposEventos.map((evento) => (
                                                                    <option value={evento.tipo} key={evento.id}>{evento.tipo}</option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                        <div>
                                                            <label for="descripcion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de evento</label>
                                                            <textarea
                                                                type="text"
                                                                name="descripcion"
                                                                id="descripcion"
                                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                                placeholder="Ingrese la descripcion del evento captado"
                                                                required
                                                                style={{ maxHeight: "150px" }}
                                                                onChange={handleChange}
                                                            >

                                                            </textarea>
                                                        </div>
                                                        <button class="bg-blue-500 hover:bg-blue-700 text-gray-200 w-full justify-center font-bold py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                                            onClick={handleSubmit}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                                                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                                <path d="M14 4l0 4l-6 0l0 -4" />
                                                            </svg>
                                                            <span className='ml-1'>Agregar</span>
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-sm border border-gray-300 rounded-lg text-sm mt-5 py-1">
                    <div className="overflow-y-auto min-h-[700px] max-h-[700px] scrollbar-container bg-white">
                        <table className="w-full">
                            <TableHead >
                                <TableRow >
                                    <TableCell />
                                    <TableCell align='left' >Fecha</TableCell>
                                    <TableCell align="left">Evento</TableCell>
                                    <TableCell align="left">Descripcion</TableCell>
                                    <TableCell align="left">Notificado</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {currentData
                                    .filter(dato =>
                                        Object.values(dato).some(value =>
                                            typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
                                        )
                                    )
                                    .map((dato) => (
                                        <Row key={dato.id} row={dato} busqueda={busqueda}></Row>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formulario;
