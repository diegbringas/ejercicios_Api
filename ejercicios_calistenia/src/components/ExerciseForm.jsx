import { useState, useEffect } from 'react';
import axios from 'axios';
import './ExerciseForm.css';

export const ExerciseForm = () => {
  const [exercises, setExercises] = useState([]);
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

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExercise({
      ...newExercise,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar que todos los campos tengan valor
    if (!newExercise.nombre || !newExercise.patron || !newExercise.dificultad || !newExercise.musculos) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/exercises', newExercise); 
      fetchExercises(); 
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
          placeholder="Ingrese el nombre del ejercicio"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="patron">Patrón de movimiento</label>
        <select
          className="form-control"
          name="patron"
          value={newExercise.patron}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un patrón</option> {/* Opción vacía */}
          <option value="empuje">Empuje</option>
          <option value="jalon">Jalón</option>
          <option value="piernas">Piernas</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dificultad">Dificultad</label>
        <select
          className="form-control"
          name="dificultad"
          value={newExercise.dificultad}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una dificultad</option> {/* Opción vacía */}
          <option value="basico">Básico</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="musculos">Músculos</label>
        <select
          className="form-control"
          name="musculos"
          value={newExercise.musculos}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un músculo</option> {/* Opción vacía */}
          <option value="pecho">Pecho</option>
          <option value="espalda">Espalda</option>
          <option value="dorsal">Dorsal</option>
          <option value="biceps">Bíceps</option>
          <option value="triceps">Tríceps</option>
          <option value="trapecio">Trapecio</option>
          <option value="deltoide">Deltoide</option>
          <option value="core">Core</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Agregar Ejercicio
      </button>
    </form>
  );
};
