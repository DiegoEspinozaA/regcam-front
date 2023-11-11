import React, { useEffect, useState } from 'react';
import Link from '../Apiconf';
import Nav from '../componentes/Navbar';
import { Button } from '@material-tailwind/react';
import { Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from '@nextui-org/react';
export default function Estados() {
    const [camaras, setCamaras] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    useEffect(() => {
        fetch(Link + '/camaras')
            .then(res => res.json())
            .then(data => {
                setCamaras(data);
                setMin(data[0].id);
                setMax(data[data.length - 1].id);
                setIsLoading(false);

            })
            .catch(error => {
                console.error('Error en la primera solicitud:', error);
            });

    }, [])



    const setFilters = () => {
        setBusqueda('');
        setMinimo('');
        setMaximo('');
    }

    const buscarActivado = !minimo && !maximo;
    const minMaxActivados = !busqueda;


    const elementosFiltrados = camaras.filter(elemento => {
        if (minMaxActivados) {
            const numeroElemento = parseInt(elemento.id, 10);
            const min = minimo !== '' ? parseInt(minimo, 10) : -Infinity;
            const max = maximo !== '' ? parseInt(maximo, 10) : Infinity;
            return numeroElemento >= min && numeroElemento <= max;
        }
        return elemento.id.toString().toLowerCase().includes(busqueda.toLowerCase());

    });


    const [activeDropdown, setActiveDropdown] = useState(null);
    const handleDropdownToggle = (index) => {
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);

        }
    };
    const handleDropdownClose = () => {
        setActiveDropdown(null);
    };


    return (
        <div className='xl:ml-80 h-[calc(100vh-32px)] my-4 px-4  max-w-screen rounded-xl transition-transform duration-300 xl:translate-x-0'>
            <Nav></Nav>
            <div className="text-sm  text-black flex flex-col justify-center w-full bg-white p-6 shadow-lg rounded-xl mt-3">
                <p className='text-xl font-bold text-gray-700 font-base mb-5'>Estados camaras</p>


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
                            type="number"
                            className={`py-2 pl-10 focus:ring-1  focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!buscarActivado ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                            placeholder='Buscar'
                            value={busqueda}
                            min={min}
                            onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                    e.preventDefault();
                                }
                            }}
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
                                min={min}
                                max={max}
                                onKeyDown={(e) => {
                                    if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                        e.preventDefault();
                                    }
                                }}
                                className={`py-2 pl-4 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                placeholder={min}
                                value={minimo}
                                onChange={(e) => setMinimo(e.target.value)}
                                disabled={!minMaxActivados}
                            />
                            {!isLoading && (
                                <>
                                    <p className='font-bold mr-2 ml-4'>Maximo</p>
                                    <input
                                        type="number"
                                        id="upper"
                                        min={min}
                                        max={max}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === '.' || e.key === ',') {
                                                e.preventDefault();
                                            }
                                        }}
                                        placeholder={max}
                                        className={`py-2  pl-4 pr-2 focus:ring-1 focus:outline-none border rounded border-gray-300 transition duration-200 ease-in ${!minMaxActivados ? 'bg-red-200 transition duration-200 ease-in' : ''}`}
                                        value={maximo}
                                        onChange={(e) => setMaximo(e.target.value)}
                                        disabled={!minMaxActivados}
                                    /></>
                            )}

                        </div>
                        {(busqueda.length > 0 || minimo.length > 0 || maximo.length > 0) && (
                            <button
                                className='ml-4 bg-gray-300 border border-gray-300 text-gray-700 text-[12px] py-1 px-3 semibold rounded-full  hover:bg-gray-400 hover:border-gray-600 transition-all duration-200'
                                onClick={() => setFilters()}
                            >
                                Reiniciar
                            </button>
                        )}
                    </div>
                </div>
                <div className="mt-5 w-full rounded-lg shadow-lg  bg-gray-100 h-[calc(100vh-226px)] border border-gray-200 py-6">
                    <div className="overflow-y-auto scrollbar-container bg-gray-100 max-h-full">
                        <div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1'>
                            {!isLoading ? (
                                <>

                                    {elementosFiltrados.map((index) => (
                                        <div key={index.id} className="relative flex justify-end items-center gap-2">
                                            <Dropdown className='bg-gray-500 rounded-xl outline-none border-none shadow-md text-gray-100'
                                                onClose={handleDropdownClose}
                                                isOpen={activeDropdown === index.id}
                                            >
                                                <DropdownTrigger >
                                                    <Button
                                                        className={`focus:outline-none semibold text-lg mb-5 shadow-md flex ${index.id === activeDropdown ? 'bg-red-400' : 'bg-gray-500'} items-center text-white justify-center w-16 h-16  rounded-xl hover:bg-red-400 font-bold transition-all duration-200 `}
                                                        onClick={() => {
                                                            handleDropdownToggle(index.id);
                                                        }}
                                                    >

                                                        {index.id}
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu>
                                                    <DropdownItem className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150 mb-1'>Actualizar estado</DropdownItem>
                                                    <DropdownItem className='bg-gray-500 hover:bg-gray-400 rounded-lg transition-all duration-150'>Historial </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>

                                    ))}
                                </>
                            ) : <></>}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}

