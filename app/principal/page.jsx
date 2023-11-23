'use client'
import React, { useState, useEffect } from 'react';
import { ninosCensados } from "@/hooks/prot";
import Editar from '../editar/page';

const Principal = () => {
    const [ninos, setNinos] = useState([]);
    const [ninoSeleccionado, setNinoSeleccionado] = useState(null);

    useEffect(() => {
        const obtenerNinosCensados = async () => {
            try {
                const listaDeNinos = await ninosCensados();
                setNinos(listaDeNinos);
            } catch (error) {
                console.error('Error al obtener la lista de niños censados:', error.message);
            }
        };

        obtenerNinosCensados();
    }, []);

    const handleVerDetalles = (nino) => {
        console.log('Detalles del niño:', nino);
        setNinoSeleccionado(nino);
    };

    return (
        <div className="container mt-5">
            <button type="button" className="btn btn-primary btn-lg">Añadir censo</button>

            <h2 className="mt-4">Niños Censados</h2>

            {ninos.length > 0 ? (
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Representante</th>
                            <th>Escuela</th>
                            <th>Curso</th>
                            <th>Edad</th>
                            <th>Peso</th>
                            <th>Talla</th>
                            <th>Actividad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ninos.map(nino => (
                            <tr key={nino.id}>
                                <td>{nino.nombres}</td>
                                <td>{nino.representante}</td>
                                <td>{nino.escuela}</td>
                                <td>{nino.curso}</td>
                                <td>{nino.edad}</td>
                                <td>{nino.peso}</td>
                                <td>{nino.talla}</td>
                                <td>{nino.actividades}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => handleVerDetalles(nino)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay niños censados.</p>
            )}

            {/* Renderizar el componente Editar con el ninoSeleccionado */}
            {ninoSeleccionado && <Editar nino={ninoSeleccionado} />}
        </div>
    );
};

export default Principal;






