import { useState, useEffect } from 'react';
import axios from 'axios';
import './ExerciseForm.css';

export const ExerciseForm = () => {
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newExercise, setNewExercise] = useState({
    nombre: '',
    patron: '',
    dificultad: '',
    musculos: ''
  });

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:5000/exercises'); 
      setExercises(response.data);
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
    }
  };

  // Llamada a fetchExercises
  useEffect(() => {
    fetchExercises();
  }, []);

  const handleChange = (e) => {
    setNewExercise({
      ...newExercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/exercises', newExercise); 
      fetchExercises(); // Actualiza la lista de ejercicios después de agregar uno nuevo
      setNewExercise({
        nombre: '',
        patron: '',
        dificultad: '',
        musculos: ''
      });
    } catch (error) {
      console.error('Error al agregar ejercicio:', error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     console.log('Ejercicio que se va a eliminar:', id); // Verificar el ID
  
  //     await axios.delete(`http://localhost:5000/exercises/${id}`);
  
  //     setExercises((prevExercises) => {
  //       const updatedExercises = prevExercises.filter(exercise => exercise.id !== id);
  //       console.log('Nuevo estado de ejercicios:', updatedExercises); 
  //       return updatedExercises;
  //     });
  
  //   } catch (error) {
  //     console.error('Error al eliminar ejercicio:', error);
  //   }
  // };
  
  
  

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ejercicio">Nombre del ejercicio</label>
        <input 
        type="text" 
        className="form-control" 
        name="nombre" 
        value={newExercise.nombre}
        onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="patron">Patrón de movimiento</label>
        <input
          type="text"
          className="form-control"
          name="patron"
          value={newExercise.patron}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dificultad">Dificultad</label>
        <input
          type="text"
          className="form-control"
          name="dificultad"
          value={newExercise.dificultad}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="musculos">Músculos</label>
        <input
          type="text"
          className="form-control"
          name="musculos"
          value={newExercise.musculos}
          onChange={handleChange}
        />
      </div>


      
      
      <button type="submit" className="btn btn-primary">
        Agregar Ejercicio
      </button>



      
    </form>
  );
};
