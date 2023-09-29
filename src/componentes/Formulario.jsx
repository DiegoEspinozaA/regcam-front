import React, { useEffect, useState } from 'react';
import { correcta, incorrecta } from '../Toast/Notificaciones';
import Link from '../Apiconf';

const Formulario = () => {
    const [tiposEventos, setTiposEventos] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        tipo: 'Seleccionar',
        fecha: '',
        descripcion: '',
        locacion: '',
    });

    useEffect(() => {
        fetch(Link + '/tiposEventos')
            .then((response) => response.json())
            .then((data) => setTiposEventos(data));
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            id: '',
            tipo: 'Seleccionar',
            fecha: '',
            descripcion: '',
            locacion: '',
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            fecha: new Date().toISOString(),
        });

        const postResponse = await fetch(Link + '/guardarRegistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (postResponse.ok) {
            correcta('Evento registrado correctamente');
        } else {
            incorrecta('Error al registrar el evento');
        }
    };

    return (
        <>
        
            <div className='flex justify-center align-center w-full  mt-10'>
                <div className="w-full flex justify-center">
                    
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300">
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">
                                ID de Cámara
                            </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ingrese la ID de la camara"
                            />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="tipo" className="block text-gray-700 text-sm font-bold mb-2">
                                Tipo de Evento
                            </label>
                            <select
                                id="tipo"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="Seleccionar">Seleccionar</option>
                                {tiposEventos.map((tipoEvento) => (
                                    <option key={tipoEvento.id} value={tipoEvento.tipo}>{tipoEvento.tipo}</option>

                                ))}
                            </select>
                        </div>
                        {/* <div className="mb-4">
                        <label htmlFor="fecha" className="block text-gray-700 text-sm font-bold mb-2">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div> */}
                        <div className="mb-6">
                            <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                                Descripción
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                                placeholder="Escribe una descripción"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Enviar
                            </button>
                            <button
                                onClick={handleReset}
                                className="border border-gray-500 text-black py-2 px-4 rounded focus:shadow-outline hover:bg-gray-100"
                            >
                                Reiniciar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Formulario;
