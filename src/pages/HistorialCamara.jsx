import React, { useState, useEffect } from 'react';
import Link from "../Apiconf";
import { useParams } from 'react-router-dom';

export default function HistorialCamara() {
    const {id_camara} = useParams();
    const [historial, setHistorial] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:3001/historialEstadoCamara/${id_camara}`)
            .then(res => res.json())
            .then(data => {
                setHistorial(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener el historial:', error);
                setIsLoading(false);
            });
    }, [id_camara]);



    return (
        <div className='pl-80'>
    <h3>Historial de Estados para la Cámara {id_camara}</h3>
    <ul>
        {historial.map((item, index) => (
            <li key={index}>
                Cambió de {item.EstadoAnterior} a {item.EstadoActual} - Fecha de Cambio: {item.FechaCambio}
            </li>
        ))}
    </ul>
</div>

    );
}
