import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from "./componentes/Formulario";
import Registros from "./componentes/Registros";
import Estados from './componentes/Estados';
import Navbar from "./componentes/Navbar";
import { Toaster } from 'react-hot-toast';
import Recientes from './componentes/Recientes';
import { TransitionGroupTabs } from "./componentes/transition-group";
import { useTabs } from "./componentes/useTabs";
import { useState } from 'react';

import {BiLogOutCircle} from "react-icons/bi";
function App() {
  const [hookProps] = useState({
    tabs: [
      {
        label: "Registrar Evento",
        children: <Formulario />,
        id: "evento",
      },
      {
        label: "Registrar Estados",
        children: <Estados />,
        id: "estado",
      },
      {
        label: "Registros",
        children: <Registros />,
        id: "registros",
      },
    ],
    initialTabId: "Triangle",
  });
  const transitionGroup = useTabs(hookProps);

  return (
    <div className="">
      <header className='flex w-full h-[90px] bg-white relative'>
        <div className="w-full">
          <div className='flex w-full justify-between px-9 py-4 items-center' >
            <div className='flex'>
              <p >REG</p><p className='text-red-500'>CAM</p>
            </div>
            <button className='bg-gray-200 rounded-full p-1 border border-gray-400 hover:border-gray-600 hover:bg-gray-300 transition all ease-in-ou time-300'>
            <BiLogOutCircle size={20}></BiLogOutCircle>
            </button>
          </div>

          <div className="absolute left-0 bottom-0 ">
            <TransitionGroupTabs {...transitionGroup.tabProps} />

          </div>
        </div>

      </header>
      <section className="flex align-center h-full w-full">
        <div className="py-9 w-full items-center">{transitionGroup.selectedTab.children}</div>
        <Toaster toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }} />

      </section>
    </div>
  );
}

export default App;