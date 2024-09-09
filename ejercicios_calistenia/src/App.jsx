import { Routes,Route } from 'react-router-dom'
import AddExercise from './pages/AddExercise'
import ExerciseListPage from './pages/ExerciseListPage'

export const App = () => {
  return (
    
    <>
    
      <h1>Libreria de ejercicios</h1>
      <Routes>
        
        
        <Route path= "/" element={<AddExercise> </AddExercise>} />
        <Route path= "/ejercicio" element={<ExerciseListPage></ExerciseListPage>} />

      </Routes>
    </>

  )
}
