import { useEffect, useState } from 'react';
import axios from 'axios';
import './ExerciseList.css';


const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/exercises');
      setExercises(response.data);
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/exercises/${id}`);
      setExercises(exercises.filter(exercise => exercise.id !== id));
    } catch (error) {
      console.error('Error al eliminar ejercicio:', error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
   <div className="container">
   <table className='table table-striped'>
    <thead>
        <tr>
          <th>Nombre</th>
          <th>Patrón</th>
          <th>Dificultad</th>
          <th>Músculos</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map(exercise => (
          <tr key={exercise.id}>
            <td>{exercise.nombre}</td>
            <td>{exercise.patron}</td>
            <td>{exercise.dificultad}</td>
            <td>{exercise.musculos}</td>
            <td>
              <button 
                className="btn btn-danger"
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

export default ExerciseList;
