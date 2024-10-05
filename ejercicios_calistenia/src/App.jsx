import { Routes,Route } from 'react-router-dom'
import AddExercise from './pages/AddExercise'
import ExerciseListPage from './pages/ExerciseListPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WeeklyWorkoutManager from './pages/WeeklyWorkoutManager'

export const App = () => {
  return (
    
    <>
    
      <h1 className='h1-app'>CALISPEDIA</h1>

      <Routes>
        
        <Route path="/" element={<LoginPage> </LoginPage>} />
        <Route path="/register" element={<RegisterPage> </RegisterPage>} />
        
        <Route path= "/add-exercise" element={<AddExercise> </AddExercise>} />
        <Route path= "/entrenamiento-semanal" element={<WeeklyWorkoutManager> </WeeklyWorkoutManager>} />
        
        <Route path= "/ejercicio" element={<ExerciseListPage></ExerciseListPage>} />



      </Routes>
    </>

  )
}
