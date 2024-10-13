import { Routes,Route } from 'react-router-dom'
import AddExercise from './pages/AddExercise'
import ExerciseListPage from './pages/ExerciseListPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WeeklyWorkoutManager from './pages/WeeklyWorkoutManager'
import FixedExerciseList from './components/FixedExerciseList'
import Navbar from './components/Navbar'
import Home from './components/Home'

export const App = () => {
  return (
    
    <>
    
      <h1 className='h1-cabecera'>Unete a nuestra comunidad de entrenamiento</h1>

      <Navbar />

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-exercise" element={<AddExercise />} />
        <Route path="/entrenamiento-semanal" element={<WeeklyWorkoutManager />} />
        <Route path="/ejercicio" element={<ExerciseListPage />} />
        <Route path="/ejercicios-fijos" element={<FixedExerciseList />} />




      </Routes>
    </>

  )
}
