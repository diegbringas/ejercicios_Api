import axios from "axios";
import { useState, useEffect } from "react";
import './WorkoutManager.css'; 

const EntrenamientoSemanal = () => {
    const entrenamientosIniciales = {
        Lunes: [],
        Martes: [],
        Miercoles: [],
        Jueves: [],
        Viernes: [],
        Sabado: [],
        Domingo: []
    };

    const [entrenamientos, setEntrenamientos] = useState(entrenamientosIniciales);
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
    const [ejerciciosFijos, setEjerciciosFijos] = useState([]);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState('');
    const [repeticiones, setRepeticiones] = useState(''); // Nuevo estado para repeticiones
    const [rpe, setRpe] = useState(''); // Nuevo estado para RPE
    const [agregarEjercicio, setAgregarEjercicio] = useState(false);

    useEffect(() => {
        const fetchEjercicios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/exercises');
                setEjerciciosDisponibles(response.data);
            } catch (error) {
                console.error('Error al obtener los ejercicios', error);
            }
        };

        const fetchEjerciciosFijos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ejercicios-fijos');
                setEjerciciosFijos(response.data);
            } catch (error) {
                console.error('Error al obtener ejercicios fijos', error);
            }
        };

        fetchEjercicios();
        fetchEjerciciosFijos();
    }, []);

    const manejarAgregarEjercicio = () => {
        if (ejercicioSeleccionado && repeticiones && rpe) {
            setEntrenamientos(prev => ({
                ...prev,
                [diaSeleccionado]: [
                    ...prev[diaSeleccionado],
                    { nombre: ejercicioSeleccionado, repeticiones, rpe }
                ]
            }));
            setEjercicioSeleccionado('');
            setRepeticiones('');
            setRpe('');
            setAgregarEjercicio(false);
        }
    };

    const manejarEliminarEjercicio = (dia, index) => {
        const nuevosEjercicios = entrenamientos[dia].filter((_, i) => i !== index);
        setEntrenamientos(prev => ({
            ...prev,
            [dia]: nuevosEjercicios
        }));
    };

    const manejarGuardarEntrenamientos = async () => {
        try {
            await axios.post('http://localhost:5000/guardar-entrenamientos', entrenamientos);
            alert('Entrenamientos guardados exitosamente.');
        } catch (error) {
            alert('Error al guardar los entrenamientos.');
        }
    };

    return (
        <div className="inicio">
            <h1>Administrador de Entrenamientos Semanales</h1>
            {Object.keys(entrenamientosIniciales).map(dia => (
                <div key={dia} className="dia-rutina">
                    <h2>{dia}</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Ejercicio</th>
                                <th>Repeticiones</th>
                                <th>RPE</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entrenamientos[dia].map((ejercicio, index) => (
                                <tr key={index}>
                                    <td>{ejercicio.nombre}</td>
                                    <td>{ejercicio.repeticiones}</td>
                                    <td>{ejercicio.rpe}</td>
                                    <td>
                                        <button onClick={() => manejarEliminarEjercicio(dia, index)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {diaSeleccionado === dia && agregarEjercicio && (
                        <div className="agregar-ejercicio">
                            <select
                                value={ejercicioSeleccionado}
                                onChange={(e) => setEjercicioSeleccionado(e.target.value)}
                            >
                                <option value="">Selecciona un ejercicio</option>
                                {[...ejerciciosDisponibles, ...ejerciciosFijos].map((ejercicio) => (
                                    <option key={ejercicio.id} value={ejercicio.nombre}>
                                        {ejercicio.nombre}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Repeticiones"
                                value={repeticiones}
                                onChange={(e) => setRepeticiones(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="RPE"
                                value={rpe}
                                onChange={(e) => setRpe(e.target.value)}
                            />
                            <button onClick={manejarAgregarEjercicio}>Agregar</button>
                        </div>
                    )}

                    <button onClick={() => {
                        setDiaSeleccionado(dia);
                        setAgregarEjercicio(true);
                    }}>
                        Agregar ejercicio a {dia}
                    </button>
                </div>
            ))}

            <button onClick={manejarGuardarEntrenamientos}>Guardar Entrenamientos</button>
        </div>
    );
};

export default EntrenamientoSemanal;
