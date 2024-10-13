import { useEffect, useState } from 'react';
import axios from 'axios';

const FixedExerciseList = () => {
  const [fixedExercises, setFixedExercises] = useState([]);

  const fetchFixedExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ejercicios-fijos');
      setFixedExercises(response.data);
    } catch (error) {
      console.error('Error al obtener ejercicios fijos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token en el localStorage');
        return;
      }
      await axios.delete(`http://localhost:5000/ejercicios-fijos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFixedExercises(fixedExercises.filter(exercise => exercise.id !== id));
    } catch (error) {
      console.error('Error al eliminar ejercicio fijo:', error.response || error);
    }
  };

  useEffect(() => {
    fetchFixedExercises();
  }, []);

  return (
    <div className="container">
      <h2>Ejercicios Fijos</h2>
      <table className="exercise-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Patrón</th>
            <th>Dificultad</th>
            <th>Músculos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fixedExercises.map(exercise => (
            <tr key={exercise.id}>
              <td>{exercise.nombre}</td>
              <td>{exercise.patron}</td>
              <td>{exercise.dificultad}</td>
              <td>{exercise.musculos}</td>
              <td>
                <button 
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(exercise.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixedExerciseList;
