import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Sidebar from "./componentes/Sidebar";
import Formulario from "./pages/Recientes";
import Estados from "./pages/Estados";
import Registros from "./pages/Registros";
import Registro from "./componentes/Registro";
import Historial from "./pages/Historial";
import { ThemeProvider } from "@material-tailwind/react";
import { Navigate } from 'react-router-dom';
import VerMas from './componentes/VerMas';
import { useAppContext } from './AppContext';
import EditarRegistro from './forms/EditarRegistro';
import { useEffect } from 'react';
import Link from './Apiconf';
import AgregarEvento from './forms/AgregarEvento';
function App() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registrosResponse = await fetch(Link + '/registros');
        const registrosData = await registrosResponse.json();

        const tiposEventosResponse = await fetch(Link + '/tiposEventos');
        const tiposEventosData = await tiposEventosResponse.json();

        dispatch({ type: 'SET_REGISTROS', payload: registrosData });
        dispatch({ type: 'TOGGLE_EVENTOS', payload: tiposEventosData });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);


  return (
    <ThemeProvider>
      
      {state.showVerMasForm && <VerMas />}
      {state.showAgregarInformacionForm && <EditarRegistro />}
      {state.showAgregar && <AgregarEvento/>}
      <BrowserRouter>
        <div className="flex">
          <Sidebar />

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
              <Route path="/eventos" element={<Formulario />} />
              <Route path="/estados" element={<Estados />} />
              <Route path="/registros" element={<Registros />} />
              <Route path="/registros/camara/:id" element={<Registro />} />
              <Route path="/registros/camara/:id_camara/historial/:id_registro" element={<Historial />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;