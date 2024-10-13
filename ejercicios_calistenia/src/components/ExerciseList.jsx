import { useEffect, useState } from 'react';
import axios from 'axios';
import './ExerciseList.css';  // Si tienes CSS personalizado, asegúrate de que no esté afectando el layout
import image1 from '../assets/images/front.jpg'
import image2 from '../assets/images/hs-pushup.jpg'
import image3 from '../assets/images/Leeplanche.webp'
import image4 from '../assets/images/muscleup.jpg'
import image5 from '../assets/images/dips.jpg'
import image6 from '../assets/images/handstand.jpg'


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
    <div className="cuadros">

      <div className="card">
        
          <img src={image1} alt="image" 
          style={{
            width: '100%',
            height:'50vh'
            }} />
           <button className="view-button">Ver Detalles</button>
          

      </div>
      <div className="card">
          <img src={image2} alt="image" 
          style={{
            width: '100%',
            height:'50vh'

            }} />
          <button className="view-button">Ver Detalles</button>

      </div>
      <div className="card">
          <img src={image3} alt="image" 
          style={{
            width: '100%',
            height:'50vh'

            }} />
          <button className="view-button">Ver Detalles</button>

      </div>
      <div className="card">
          <img src={image4} alt="image" 
          style={{
            width: '100%',
            height:'50vh'
            }} />
          <button className="view-button">Ver Detalles</button>

      </div>
      <div className="card">
          <img src={image5} alt="image" 
          style={{
            width: '100%',
            height:'50vh'
            }} />
          <button className="view-button">Ver Detalles</button>


      </div>
      <div className="card">
        
          <img src={image6} alt="image" 
          style={{
            width: '100%',
            height:'50vh'
            }} />
          <button className="view-button">Ver Detalles</button>

      </div>
    </div>
    
    <h2>EXERCISES</h2>

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
          {exercises.map(exercise => (
            <tr key={exercise.id}>
              <td>{exercise.nombre}</td>
              <td>{exercise.patron}</td>
              <td>{exercise.dificultad}</td>
              <td>{exercise.musculos}</td>
              <td>
                <button onClick={() => handleDelete(exercise.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
