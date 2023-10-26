import React, { useEffect, useState } from 'react';
import Link from '../Apiconf';

export default function Estados() {
    const [camaras, setCamaras] = useState([]);
    const [busqueda, setBusqueda] = useState(null);
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');

    useEffect(() => {
        fetch(Link + '/camaras')
            .then(res => res.json())
            .then(data => {
                setCamaras(data);
            })
            .catch(error => {
                console.error('Error en la primera solicitud:', error);
            });
    }, [])

    const elementos = Array.from({ length: 10 }, (_, index) => index + 1);

    const elementosFiltrados = elementos.filter(elemento => {
        // Filtrar elementos en función del rango (Minimo y Maximo)
        const numeroElemento = parseInt(elemento, 10);
        const min = minimo !== '' ? parseInt(minimo, 10) : -Infinity;
        const max = maximo !== '' ? parseInt(maximo, 10) : Infinity;
        return numeroElemento >= min && numeroElemento <= max;
    });

    const buscarActivado = !minimo && !maximo;
    const minMaxActivados = !busqueda;

    return (
        <div className='p-4 xl:ml-80 max-w-screen flex align-center justify-center mt-10'>
            <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded border border-gray-300">
                <div className='flex'>
                    <div className="relative text-gray-600 focus-within:text-black rounded ">
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
                            className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                            placeholder='Buscar'
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            disabled={!buscarActivado}
                        />
                    </div>
                    <div className='flex ml-7'>
                        <div className="flex items-center relative text-gray-600 focus-within:text-black rounded">
                            <p className='font-bold mr-2 '>Minimo</p>
                            <input
                                type="number"
                                id="lower"
                                className={`py-2 pl-10 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                placeholder='1'
                                value={minimo}
                                onChange={(e) => setMinimo(e.target.value)}
                                disabled={!minMaxActivados}
                            />

                            <p className='font-bold mr-2 ml-4'>Maximo</p>
                            <input
                                type="number"
                                id="upper"
                                placeholder={elementos.length.toString()}
                                className={`py-2 pl-10 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                value={maximo}
                                onChange={(e) => setMaximo(e.target.value)}
                                disabled={!minMaxActivados}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full bg-background-color py-5 pl-7 rounded mt-5 border border-gray-300 shadow-lg'>
                    <div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1 p-4'>
                        {elementosFiltrados.map((index) => (
                              <button
                              key={index}
                              className="shadow-lg flex items-center text-white border border-gray-900 justify-center w-16 h-16 bg-gray-500 rounded-full hover:bg-red-400 font-bold transition-all duration-200"
          
                            >
                              {index}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

