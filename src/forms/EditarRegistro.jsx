import React from "react";
import { useState, useEffect } from "react";
import Link from "../Apiconf";
import { correcta, incorrecta } from "../Toast/Notificaciones";
export default function EditarRegistro({ registro, setEditModalOpen, tiposEventos, isEditModalOpen, getRegistros }) {
    
    const handleCloseModal = () => {
        setEditModalOpen(false);
    }

    const [formData, setFormData] = useState({
        id_registro: registro.id,
        id_camara: registro.id_camara,
        fecha: registro.fecha,
        tipo: registro.tipo,
        descripcion: registro.descripcion,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const postResponse = await fetch(Link + '/actualizarRegistro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (postResponse.ok) {
            correcta('Evento registrado correctamente');
            getRegistros();
        } else {
            console.log(postResponse)
            incorrecta('Ha ocurrido un error');
        }
    };

    console.log(formData)

    return (
        <>
            {isEditModalOpen && (
                <div className="bg-zinc-900/40 p-10 text-black fixed inset-0 flex items-center justify-center z-50">
                    <div className="text-blak relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg">
                            <button type="button" className="absolute top-3 right-1 bg-transparent rounded-lg text-sm px-2 font-bold py-1 ml-auto inline-flex justify-center items-center text-red-600 hover:bg-red-200 transition-all duration-200" data-modal-hide="authentication-modal"
                                onClick={handleCloseModal}
                            >
                                Cerrar
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium">Editar Evento</h3>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label for="id" className="block mb-2 text-sm font-medium text-gray-900">Camara</label>
                                        <input
                                            type="text"
                                            name="id_camara"
                                            id="id_camara"
                                            className="shadow-md p-2.5 w-full focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in"
                                            placeholder="Ingrese el ID de la camara"
                                            required
                                            value={formData.id_camara}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label for="id" className="block mb-2 text-sm font-medium text-gray-900">Fecha</label>
                                        <input
                                            type="datetime-local"
                                            name="fecha"
                                            id="fecha"
                                            className="shadow-md p-2.5 w-full focus:ring-1 focus:outline-none border rounded text-sm border-gray-300 transition duration-200 ease-in"
                                            placeholder="Fecha"
                                            required
                                            value={formData.fecha}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label for="tipo" className="block mb-2 text-sm font-medium text-gray-900">Tipo de evento</label>
                                        <select
                                            name="tipo"
                                            id="tipo"
                                            className="shadow-md border focus:ring-1 focus:outline-none border-gray-300 transition duration-200 ease-in text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            value={formData.tipo}
                                            onChange={handleInputChange}
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
                                            value={formData.descripcion}
                                            onChange={handleInputChange}
                                            style={{ maxHeight: "200px", minHeight: "70px" }}
                                        ></textarea>
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-gray-200 w-full justify-center font-bold py-2 px-5 rounded inline-flex items-center transition duration-100 ease-in"
                                    >
                                        <span className="ml-1">Guardar</span>
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
