import axios from 'axios';

const API_URL = 'http://localhost:5000/exercises';

// Obtener todos los ejercicios
export const getExercises = async () => {
    return await axios.get(API_URL);
};

// Obtener 1 solo ejer por ID
export const getExerciseById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

// Agregar un nuevo ejercicio
export const addExercise = async (exercise) => {
    return await axios.post(API_URL, exercise);
};

// Actualizar por ID
export const updateExercise = async (id, exercise) => {
    return await axios.put(`${API_URL}/${id}`, exercise);
};

// Elimina por ID
export const deleteExercise = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
