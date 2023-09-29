import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiCameraHome, BiLogOut, BiPencil, BiDetail } from 'react-icons/bi';

export default function Navbar() {
  const [seleccionado, setSeleccionado] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setSeleccionado(1);
    }
    else if (location.pathname === '/estados') {
      setSeleccionado(2);
    }

    else if (location.pathname === '/registros') {
      setSeleccionado(3);
    }
    else if (location.pathname === '/recientes') {
      setSeleccionado(4);
    }

  }, [location]);

  return (
    <div className="text-sm navbar flex h-[70px] items-center bg-white text-zinc-400 border-b-[1px] border-zinc-400 text-zinc-600">
      <div className="container">
        <div className="opciones">
          <ul className="flex">
            <li className="flex items-center ml-2 mr-2">
              <Link to="/">
                <button
                  className={`${seleccionado === 1 ? "activo " : ""} flex items-center hover:bg-blue-100 p-2 rounded-lg hover:text-black transition duration-300 ease-in-out`}
                  onClick={() => setSeleccionado(1)}
                >
                  <p className="ml-2">Registrar Evento</p>
                </button>
              </Link>
            </li>
            <li className="flex items-center ml-2 mr-2">
              <Link to="/estados">
                <button
                  className={`${
                    seleccionado === 2 ? "activo " : ""
                  } flex items-center hover:bg-blue-100 p-2 rounded-lg hover:text-black transition duration-300 ease-in-out`}
                  onClick={() => setSeleccionado(2)}
                >
                  <p className="ml-2">Registrar Estado</p>
                </button>
              </Link>
            </li>
            <li className="flex items-center ml-2 mr-2">
              <Link to="/registros">
                <button
                  className={`${
                    seleccionado === 3 ? "activo " : ""
                  } flex items-center hover:bg-blue-100 p-2 rounded-lg hover:text-black transition duration-300 ease-in-out`}
                  onClick={() => setSeleccionado(3)}
                >
                  <p className="ml-2">Registros</p>
                </button>
              </Link>
            </li>
            <li className="flex items-center ml-2 mr-2">
              <Link to="/recientes">
                <button
                  className={`${
                    seleccionado === 4 ? "activo " : ""
                  } flex items-center hover:bg-blue-100 p-2 rounded-lg hover:text-black transition duration-300 ease-in-out`}
                  onClick={() => setSeleccionado(4)}
                >
                  <p className="ml-2">Recientes</p>
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <button>
          <BiLogOut size={20}></BiLogOut>
        </button>
      </div>
    </div>
  );
}
