import React from 'react';
import Formulario from "./componentes/Formulario";
import Registros from "./componentes/Registros";
import Estados from './componentes/Estados';
import Recientes from './componentes/Recientes';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./componentes/Navbar";
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />

        <div className="flex-1">
          <Toaster
            toastOptions={{
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
            }}
          />

          <Routes>
            <Route exact path="/" element={<Formulario />} />
            <Route path="/estados" element={<Estados />} />
            <Route path="/registros" element={<Registros />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;