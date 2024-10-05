import axios from "axios";
import { useState } from "react";
import './WorkoutManager.css'


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
    const [nombreEjercicio, setNombreEjercicio] = useState('');
    const [agregarEjercicio, setAgregarEjercicio] = useState(false);

    const manejarAgregarEjercicio = () => {
        if (nombreEjercicio) {
            setEntrenamientos(prev => ({
                ...prev,
                [diaSeleccionado]: [...prev[diaSeleccionado], nombreEjercicio]
            }));
            setNombreEjercicio('');
            setAgregarEjercicio(false);
        }
    };

    const manejarEliminarEjercicio = (index) => {
        const nuevosEjercicios = entrenamientos[diaSeleccionado].filter((_, i) => i !== index);
        setEntrenamientos(prev => ({
            ...prev,
            [diaSeleccionado]: nuevosEjercicios
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
        <div>
            <h1>Administrador de Entrenamientos Semanales</h1>
            <table>
                
                <tbody>
                    <tr>
                        {Object.keys(entrenamientosIniciales).map(dia => (
                            <td key={dia} onClick={() => {
                                setDiaSeleccionado(dia);
                                setAgregarEjercicio(true);
                            }}>
                                {dia}
                                {agregarEjercicio && diaSeleccionado === dia && (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Nombre del ejercicio"
                                            value={nombreEjercicio}
                                            onChange={(e) => setNombreEjercicio(e.target.value)}
                                        />
                                        <button onClick={manejarAgregarEjercicio}>Agregar</button>
                                    </div>
                                )}
                                <ul>
                                    {entrenamientos[dia].map((ejercicio, index) => (
                                        <li key={index}>
                                            {ejercicio}
                                            <button onClick={() => manejarEliminarEjercicio(index)}>Eliminar</button>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <button onClick={manejarGuardarEntrenamientos}>Guardar Entrenamientos</button>
        </div>
    );
};

export default EntrenamientoSemanal;
