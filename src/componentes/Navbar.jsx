import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CameraIcon from '@mui/icons-material/Camera';

export default function Sidebar() {
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
    <aside className=" font-sans bg-gradient-to-br from-blue-gray-800 to-blue-gray-900 -translate-x-80 fixed inset-0 z-40 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
      <div className="relative border-b border-white/20">
        <a className="flex items-center gap-4 py-6 px-8 text-white" href="#/">
        <CameraIcon></CameraIcon>
          {/* <img src="/material-tailwind-dashboard-react/img/logo-ct.png" className="inline-block relative object-cover object-center w-9 h-9 rounded-md" alt="Logo" /> */}
          <div className='flex'>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed">REG</h6>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-red-500 ml-[2px]">CAM</h6>
          </div>
        </a>
        <button className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-2">
          <li className="flex items-center ">
            <Link to="/"
              className='w-full'>
              <button
                className={"middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize " + (seleccionado === 1 ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30")}
                onClick={() => setSeleccionado(1)}
              >
                <EventIcon></EventIcon>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Registrar Evento</p>
              </button>
            </Link>
          </li>
          <li className="flex items-center ">
            <Link to="/estados"
              className='w-full'>
              <button
                className={"middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize " + (seleccionado === 2 ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30")}
                onClick={() => setSeleccionado(2)}
              >
                <CameraAltIcon></CameraAltIcon>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Estados camaras</p>
              </button>
            </Link>
          </li>
          <li className="flex items-center ">
            <Link to="/registros"
              className='w-full'>
              <button
                className={"middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize " + (seleccionado === 3 ? "bg-azul shadow-md hover:shadow-lg hover:shadow-blue-300/40 " : " hover:bg-white/10 active:bg-white/30")}
                onClick={() => setSeleccionado(3)}
              >
                <BackupTableIcon></BackupTableIcon>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Registros</p>
              </button>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  );
}


