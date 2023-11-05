import React, { useState } from 'react';
import { correcta, incorrecta } from '../Toast/Notificaciones';
import Link from '../Apiconf';

function AgregarEvento({ showModal, setShowModal, tiposEventos, setRegistros, registros, getRegistros }) {
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
            id_camara: '',
        });
    }


    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fechaChileISO = new Date().toLocaleString('sv-SE', { timeZone: 'America/Santiago' });
        const fechaFormateada = new Date().toLocaleDateString('es-ES', {}).replace(/\//g, '-');

        const newFormData = {
            ...formData,
            fecha: fechaChileISO,
        };

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
    };


    return (
        <>
            {showModal && (
                <div className="bg-gradient-to-t from-zinc-700 to-zinc-900/10 p-10 text-black fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(5px)', transition: 'all 0.5s ease-in-out' }}>
                    <div className="text-blak relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg">
                            <button type="button" className="absolute top-3 right-1 bg-transparent rounded-lg text-sm px-2 font-bold py-1 ml-auto inline-flex justify-center items-center text-red-600 hover:bg-red-200 transition-all duration-200" data-modal-hide="authentication-modal" onClick={handleCloseModal}>
                                Cerrar
                            </button>
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
                                            required
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
                                            onChange={handleChange}
                                        >
                                            {tiposEventos.map((evento) => (
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
                                            style={{ maxHeight: "200px", minHeight: "70px" }}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-gray-200 w-full justify-center font-bold py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in" onClick={handleSubmit}>
                                        <span className="ml-1">Agregar</span>
                                    </button>
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
