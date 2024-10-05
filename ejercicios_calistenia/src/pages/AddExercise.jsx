import { ExerciseForm } from "../components/ExerciseForm";

const AddExercise = () => {
  return (
    <>
      <div className="Add-1">
        
        <div className="titulo-1">
          <div>
          
          <h1 className="Add-titulo">Agregar Nuevo Ejercicio</h1>
          <p>Programa para crear una biblioteca de ejercicios 
            realacionados con Calistenia o entrenamiento corporal</p>
          <div className="titulop2"></div>
          <p>Podras navegar y visitar todos los ejercicios de la base de datos con 
            informacion precisa para que puedas descargarlo y usarlo</p>
          </div>

           <div>
          <img src="/src/assets/images/front.jpg" alt="as" className="exercise-img"></img>
        </ div> 
        </div>  
        
        <div>
          <ExerciseForm />
        </div>
      </div>
    </>
  );
};

export default AddExercise;
