import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from "./componentes/Formulario";
import Registros from "./componentes/Registros";
import Estados from './componentes/Estados';
import Navbar from "./componentes/Navbar";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="">
    <BrowserRouter>
  
        <header>
          <Navbar />
        </header>
        <section className="flex align-center h-full w-full">
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
          </Routes>
        </section>
    </BrowserRouter>
    </div>
  );
}

export default App;
