import React from 'react';
import Formulario from "./componentes/Formulario";
import Registros from "./componentes/Registros";
import Estados from './componentes/Estados';
import Recientes from './componentes/Recientes';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./componentes/Navbar";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <BrowserRouter>

        <header>
          <Navbar />
        </header>
        <section className="flex align-center h-full w-full mt-[70px]">
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
          <Routes>
            <Route exact path ="/" element={<Formulario/>} />
            <Route path="/estados" element={<Estados/>} />
            <Route path="/registros" element={<Registros/>} />
            <Route path="/recientes" element={<Recientes/>} />
          </Routes>
        </section>
    </BrowserRouter>
  );
}

export default App;