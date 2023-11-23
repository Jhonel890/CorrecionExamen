'use client'
import React, { useEffect, useState } from 'react';
import { ListaEscuelas, noCensados, obtenerCursos, nuevoCenso } from "@/hooks/prot";
import mensajes from "@/componentes/Mensajes";


export default function Nuevo() {
    const handleGuardar = async () => {
        // Verificar si tienes suficientes datos para hacer la solicitud POST
        if (
            formData &&
            ninoIncensadoSeleccionado &&
            escuelaSeleccionada &&
            cursoSeleccionado
        ) {
            // Llamar a la función postData con los datos necesarios
            const response = await nuevoCenso(
                formData,
                ninoIncensadoSeleccionado,
                escuelaSeleccionada,
                cursoSeleccionado
            );

            // Verificar la respuesta del servidor
            if (!response.error) {
                console.log('Datos guardados exitosamente:', response);
                // Aquí puedes mostrar un mensaje en pantalla
                mensajes("Datos guardados", response, "success");
                // Recargar la página
                window.location.reload();

            } else {


                mensajes("Error al guardar los datos", response.error);
                // Aquí puedes manejar el error, mostrar un mensaje, etc.
            }
        } else {
            mensajes("Faltan datos", "UPS", "warning");
        }
    };


    const handleCancelar = () => {
        // Agrega lógica para cancelar la operación
        console.log('Operación cancelada');
    };

    const [escuelas, setEscuelas] = useState([]);
    const [escuelaSeleccionada, setEscuelaSeleccionada] = useState(null);

    useEffect(() => {
        const obtenerEscuelas = async () => {
            try {
                const listaDeEscuelas = await ListaEscuelas();
                setEscuelas(listaDeEscuelas);
            } catch (error) {
                console.error('Error al obtener las escuelas:', error.message);
            }
        };

        obtenerEscuelas();
    }, []);

    const [Incensados, setIncensados] = useState([]);
    const [ninoIncensadoSeleccionado, setNinoIncensadaSeleccionada] = useState(null);

    useEffect(() => {
        const obtenerIncensados = async () => {
            try {
                const listaIncensados = await noCensados();
                setIncensados(listaIncensados);
                console.log('Lista de censados:', listaIncensados);
            } catch (error) {
                console.error('Error al obtener los censados:', error.message);
            }
        };

        obtenerIncensados();
    }, []);

    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    useEffect(() => {
        const obtenerCurso = async () => {
            try {
                const listaDeCursos = await obtenerCursos();
                setCursos(listaDeCursos);
            } catch (error) {
                console.error('Error al obtener los cursos:', error.message);
            }
        };

        obtenerCurso();
    }, []);

    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        representative: '',
        activities: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSeleccionEscuela = (event) => {
        const escuelaId = event.target.value;
        const escuelaSeleccionada = escuelas.find(escuela => escuela.external_id === escuelaId);
        setEscuelaSeleccionada(escuelaSeleccionada);
    };

    const handleSeleccionNinoIncensada = (event) => {
        const ninoIncensadaId = event.target.value;
        const ninoIncensadaSeleccionada = Incensados.find(incensado => incensado.external_id === ninoIncensadaId);
        setNinoIncensadaSeleccionada(ninoIncensadaSeleccionada);
    };

    const handleSeleccionCurso = (event) => {
        const cursoId = event.target.value;
        const cursoSeleccionado = cursos.find(curso => curso.external_id === cursoId);
        setCursoSeleccionado(cursoSeleccionado);
    };



    return (
        <div className="container mt-4">
            <h1 className="mb-4">Nuevo censo</h1>

            {escuelas.length > 0 && (
                <div className="form-group">
                    <label htmlFor="escuelas">Selecciona una escuela: </label>
                    <select
                        className="form-control"
                        id="escuelas"
                        onChange={handleSeleccionEscuela}
                        value={escuelaSeleccionada?.external_id || ''}
                    >
                        <option value="" disabled>-- Selecciona una escuela --</option>
                        {escuelas.map((escuela) => (
                            <option key={escuela.external_id} value={escuela.external_id}>
                                {escuela.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {Incensados.length > 0 && (
                <div className="form-group mt-4">
                    <label htmlFor="censados">Selecciona un niño no censado: </label>
                    <select
                        className="form-control"
                        id="censados"
                        onChange={handleSeleccionNinoIncensada}
                        value={ninoIncensadoSeleccionado?.external_id || ''}
                    >
                        <option value="" disabled>-- Selecciona un niño no censado --</option>
                        {Incensados.map((incensado) => (
                            incensado.nombres ? (
                                <option key={incensado.external_id} value={incensado.external_id}>
                                    {incensado.nombres}
                                </option>
                            ) : null
                        ))}
                    </select>
                </div>
            )}

            {cursos.length > 0 && (
                <div className="form-group mt-4">
                    <label htmlFor="cursos">Selecciona un curso: </label>
                    <select
                        className="form-control"
                        id="cursos"
                        onChange={handleSeleccionCurso}
                        value={cursoSeleccionado?.external_id || ''}
                    >
                        <option value="" disabled>-- Selecciona un curso --</option>
                        {cursos.map((curso) => (
                            <option key={curso.external_id} value={curso.external_id}>
                                {curso.denominacion}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Campos de entrada de texto */}
            <div className="form-group mt-4">
                <label htmlFor="weight">Peso: </label>
                <input
                    type="text"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group mt-4">
                <label htmlFor="height">Altura: </label>
                <input
                    type="text"
                    className="form-control"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group mt-4">
                <label htmlFor="representative">Representante: </label>
                <input
                    type="text"
                    className="form-control"
                    id="representative"
                    name="representative"
                    value={formData.representative}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group mt-4">
                <label htmlFor="activities">Actividades: </label>
                <input
                    type="text"
                    className="form-control"
                    id="activities"
                    name="activities"
                    value={formData.activities}
                    onChange={handleInputChange}
                />
            </div>

            {/* Botones de acción */}
            <div className="mt-4">
                <button className="btn btn-primary mr-2" onClick={handleGuardar}>Guardar</button>
                <button className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
            </div>
        </div>
    );
}


