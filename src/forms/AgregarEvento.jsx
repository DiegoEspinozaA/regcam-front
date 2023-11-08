import React, { useState } from 'react';
import { correcta, incorrecta } from '../Toast/Notificaciones';
import Link from '../Apiconf';
import { useEffect } from 'react';
import { Button } from '@material-tailwind/react';

function AgregarEvento({ showModal, setShowModal, setRegistros, registros, getRegistros }) {

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch(Link + '/tiposEventos')
            .then((response) => response.json())
            .then((data) => setEventos(data));
    }, [])

    const [formData, setFormData] = useState({
        id: '',
        tipo: eventos.length > 0 ? eventos[0].tipo : '',
        fecha: '',
        descripcion: '',
    });

    const handleReset = () => {
        setFormData({
            id: '',
            tipo: eventos.length > 0 ? eventos[0].tipo : '',
            fecha: '',
            descripcion: '',
            id_camara: '',
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.tipo === ''){
            formData.tipo = eventos[0].tipo;
        }
        const fechaChileISO = new Date().toLocaleString('sv-SE', { timeZone: 'America/Santiago' });
        const newFormData = {
            ...formData,
            fecha: fechaChileISO,
        };

        if (formData.tipo.length === 0 || newFormData.fecha.length === 0 || formData.descripcion.length === 0 || formData.id_camara.length === 0) {
            
            incorrecta('Todos los campos son obligatorios');
            return;
        }
        const postResponse = await fetch(Link + '/guardarRegistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFormData),
        });

        if (postResponse.ok) {
            correcta('Evento registrado correctamente');
            getRegistros();
        } else {
            incorrecta('Ha ocurrido un error');
        }

        handleReset();
    };


    return (
        <>
            {showModal && (
                <div className="bg-zinc-900/40 p-10 text-black fixed inset-0 flex items-center justify-center z-50">
                    <div className="text-blak relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg">
                            <div className='absolute right-0 flex items-center p-2'>
                                <button
                                    className=' bg-gray-300 right-0 inset-y-0 border border-gray-300 p-[2px] text-xs rounded-full  hover:bg-gray-400 hover:border hover:border-gray-600 transition-all duration-200 '
                                    onClick={handleCloseModal}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium">Registrar Evento</h3>
                                <form className="space-y-6" action="#">
                                    <div>
                                        <label for="id" className="block mb-2 text-sm font-medium text-gray-900">Camara</label>
                                        <input
                                            type="text"
                                            name="id_camara"
                                            id="id_camara"
                                            className="shadow-md p-2.5 w-full focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in"
                                            placeholder="Ingrese el ID de la camara"
                                            value={formData.id_camara}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label for="tipo" className="block mb-2 text-sm font-medium text-gray-900">Tipo de evento</label>
                                        <select
                                            name="tipo"
                                            id="tipo"
                                            className="shadow-md border focus:ring-1 focus:outline-none border-gray-300 transition duration-200 ease-in text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            required
                                            value={formData.tipo}
                                            onChange={handleChange}
                                        >
                                            {eventos.map((evento) => (
                                                <option value={evento.tipo} key={evento.id}>{evento.tipo}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label for="descripcion" className="block mb-2 text-sm font-medium text-gray-900">Descripción del evento</label>
                                        <textarea
                                            type="text"
                                            name="descripcion"
                                            id="descripcion"
                                            className="focus:ring-1 transition duration-200 ease-in focus:outline-none border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="Ingrese la descripción del evento captado"
                                            required
                                            value={formData.descripcion}
                                            style={{ maxHeight: "200px", minHeight: "70px" }}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Button className="bg-green-600 hover:bg-green-500 text-gray-200 w-full justify-center font-bold py-2 px-5  rounded inline-flex items-center transition duration-100 ease-in" onClick={handleSubmit}>
                                            <span className="ml-1">Agregar</span>
                                        </Button>
                                        <Button className="bg-yellow-600 hover:bg-yellow-500 text-gray-200  justify-center font-bold py-2 px-5 w-40 rounded inline-flex items-center transition duration-100 ease-in"
                                            onClick={handleReset}>
                                            <span className="ml-1">Reniciar</span>
                                        </Button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AgregarEvento;
