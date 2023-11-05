import React from 'react';
import Formulario from "./componentes/Formulario";
import Registros from "./componentes/Registros";
import Estados from './componentes/Estados';
import Recientes from './componentes/Recientes';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./componentes/Navbar";
import { AnimatePresence } from 'framer-motion';
import EditarRegistro from './componentes/EditarRegistro';
import Overlay from './componentes/Overlay';
import { RegistroProvider } from './context/RegistroContext';

function App() {
  return (
    <RegistroProvider>
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
              <Route path="/" element={<Navigate to="/eventos" replace />} />
              <Route exact path="/eventos" element={<Formulario />} />

              <Route path="/estados" element={<Estados />} />

              <Route path="/registros" element={<Registros />} />
              <Route path="/registros/camara/:id" element={<Overlay />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </RegistroProvider>
  );
}
export default App;