import Formulario from "../pages/Recientes";
import Estados from "../pages/Estados";
import Registros from "../pages/Registros";
import Registro from "../componentes/Registro";
import Historial from "../pages/Historial";
export default [
    { path: "/eventos", exact: true, name: "Eventos", Component: Formulario },
    { path: "/estados", name: "Estados", Component: Estados },
    { path: "/registros", name: "Registros", Component: Registros },
    {path: "/registros/camara/:id",name: "Pizza Toppings", Component: Registro},
    {path: "/registros/camara/:id_camara/historial/:id_registro", name: "Historial", Component: Historial}

];