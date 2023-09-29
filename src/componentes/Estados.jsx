import React, { useEffect, useState } from 'react';
import Link from '../Apiconf'
import { correcta, incorrecta } from '../Toast/Notificaciones';

function TuComponente() {
    const [numeroDeFilas, setNumeroDeFilas] = useState(0);
    const [numeroDeColumnas, setNumeroDeColumnas] = useState(0);
    const [datos, setDatos] = useState([]);
    const [mostrarAgregarColumnas, setMostrarAgregarColumnas] = useState(false);
    const [opcionesSelect, setOpcionesSelect] = useState([]);
    
    useEffect(() => {
        fetch(Link + '/tiposEventos')
            .then(response => response.json())
            .then(data => {
                setOpcionesSelect(data);
            })
            .catch(error => {
            });
    }, [])
    const handleNumeroDeFilasChange = (event) => {
        setNumeroDeFilas(event.target.value);
    };
    const handleNumeroDeColumnasChange = (event) => {
        setNumeroDeColumnas(event.target.value);
    };

    const handleCrearFilas = () => {
        if (numeroDeFilas > 0) {
            const nuevasFilas = Array.from({ length: numeroDeFilas }, () => ({
                id: '',
                evento: '',
                fecha: obtenerFechaActual(),
            }));
            setDatos(nuevasFilas);
            setMostrarAgregarColumnas(true);
        }
    };

    const obtenerFechaActual = () => {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        return `${año}-${mes}-${dia}`;
    };

    const handleAgregarFilas = () => {
        if (numeroDeFilas > 0) {
            const nuevasFilas = [...datos];
            for (let i = 0; i < numeroDeColumnas; i++) {
                nuevasFilas.push({
                    id: '',
                    evento: '',
                    fecha: obtenerFechaActual(),
                });
            }
            setDatos(nuevasFilas);
        }
    };

    const handleReiniciar = () => {
        setNumeroDeFilas(0);
        setNumeroDeColumnas(0);
        setDatos([]);
        setMostrarAgregarColumnas(false);

    };

    const handleSubmit = async () => {
        try {
            console.log(datos);
            const response = await fetch(Link + '/registrarEstados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            if (response.ok) {
                correcta("Datos guardados correctamente");
            } else {
                incorrecta('Error al enviar los datos a la API');
            }
        } catch (error) {
        }
    };


    return (
        <>
            <div className="mt-10 flex min-w-full justify-center text-black text-sm">
                <div className="flex w-[50%] bg-white rounded shadow-lg p-10 border border-gray-300 justify-center">
                    <div className="w-[500px]">
                        <p className="mb-1 font-bold text-left">Número de filas</p>

                        <div className='flex justify-between align-center'>
                            <div>
                                <input
                                    type="number"
                                    value={numeroDeFilas}
                                    onChange={handleNumeroDeFilasChange}
                                    className="shadow-md py-2 pl-3 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300"
                                    placeholder="Número de filas"
                                    style={{ width: '300px', height: '40px' }}
                                />
                            </div>
                            <button
                                onClick={handleCrearFilas}
                                className="text-sm border bg-gray-300 font-bold border-gray-400 rounded-full px-3 py-1 ml-5 hover:border-gray-800 transition ease-in duration-100"
                            >
                                Crear
                            </button>
                        </div>

                        <div>
                            {mostrarAgregarColumnas && (
                                <>
                                    <div className="flex items-center mt-10 mb-5">
                                        <div className="border-t border-gray-300 flex-grow h-0"></div>
                                        <div className="border-t border-gray-300 flex-grow h-0"></div>
                                    </div>
                                </>
                            )}
                            {datos.map((fila, index) => (
                                <div key={index} className="mt-3 flex justify-between">
                                    <input
                                        type="text"
                                        value={fila.id}
                                        onChange={(e) => {
                                            const nuevasFilas = [...datos];
                                            nuevasFilas[index].id = e.target.value;
                                            setDatos(nuevasFilas);
                                        }}
                                        className="w-[150px] shadow-md py-2 pl-3 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 mr-2"
                                        placeholder={`ID ${index + 1}`}
                                    />
                                    <select
                                        value={fila.evento}
                                        onChange={(e) => {
                                            const nuevasFilas = [...datos];
                                            nuevasFilas[index].evento = e.target.value;
                                            setDatos(nuevasFilas);
                                        }}
                                        className="w-[60%] shadow-md py-2 pl-3 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300"
                                    >
                                        <option value="" >Seleccione el tipo de evento</option>
                                        {opcionesSelect.map((opcion) => (
                                            <option key={opcion.tipo} value={opcion.tipo}>
                                                {opcion.tipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                        {mostrarAgregarColumnas && (
                            <>
                                <div className='mt-5'>
                                    <div className="flex items-center mb-10">
                                        <div className="border-t border-gray-300 flex-grow h-0"></div>
                                        <div className="border-t border-gray-300 flex-grow h-0"></div>
                                    </div>
                                    <p className="mt-3 font-bold text-left">Número de filas a agregar</p>
                                    <div className='flex justify-between mt-1'>
                                        <input
                                            type="number"
                                            value={numeroDeColumnas}
                                            onChange={handleNumeroDeColumnasChange}
                                            className="shadow-md py-2 pl-3 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300"
                                            placeholder="Número de filas a agregar"
                                            style={{ width: '300px', height: '40px' }}
                                        />
                                        <button
                                            onClick={handleAgregarFilas}
                                            className="text-sm border bg-gray-300 font-bold border-gray-400 rounded-full px-3 py-1 mt-2 ml-5 hover:border-gray-800 transition ease-in duration-100"
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                    <div className='w-full flex justify-between mt-5'>
                                        <button
                                            type="submit"
                                            className="mt-5 w-[130px] bg-red-500 border hover:border-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={handleSubmit}
                                        >
                                            Enviar
                                        </button>
                                        <button
                                            type="button" // Asegúrate de que sea de tipo "button" para evitar envíos de formulario
                                            onClick={handleReiniciar}
                                            className="mt-5 w-[130px] text-black border border-gray-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Reiniciar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}


                    </div>
                </div>
            </div>
        </>
    );
}

export default TuComponente;
