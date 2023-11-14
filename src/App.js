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
import HistorialCamara from './pages/HistorialCamara';
import EstadoCamara from './forms/EstadoCamara';
import AgregarCamara from './forms/AgregarCamara';
function App() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const registrosResponse = await fetch(Link + '/registros');
        const registrosData = await registrosResponse.json();

        const tiposEventosResponse = await fetch(Link + '/tiposEventos');
        const tiposEventosData = await tiposEventosResponse.json();
        
        const tiposEstadosResponse = await fetch(Link + '/estados');
        const tiposEstadosData = await tiposEstadosResponse.json();

        const camarasResponse = await fetch(Link + '/camaras');
        const camarasData = await camarasResponse.json();
        
        const response = await fetch(Link + '/historialEstadoCamara');
        const data = await response.json();

        dispatch({ type: 'SET_CAMARAS', payload: camarasData });
        dispatch({ type: 'SET_TIPOS_ESTADOS', payload: tiposEstadosData });
        dispatch({ type: 'SET_REGISTROS', payload: registrosData });
        dispatch({ type: 'TOGGLE_EVENTOS', payload: tiposEventosData });
        dispatch({ type: 'SET_historialEstadoCamara', payload: data });
        
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
      {state.showEstadoCamaraForm && <EstadoCamara />}
      {state.agregarCamarasForm && <AgregarCamara></AgregarCamara>}
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
              <Route path="/" element={<Navigate to="/registros" replace />} />
              <Route path="/registros" element={<Formulario />} />
              <Route path="/registros/historial/:id_registro" element={<Historial />} />
              <Route path="/camaras" element={<Estados />} />
              <Route path="/camaras/camara/:id" element={<Registro />} />
              <Route path="/camaras/camara/:id_camara/historial/:id_registro" element={<Historial />} />
              <Route path="/camaras/historialCamara/:id_camara" element={<HistorialCamara />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;