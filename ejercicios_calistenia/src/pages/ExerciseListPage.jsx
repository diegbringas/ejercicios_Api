import ExerciseList from '../components/ExerciseList';
import backgroundImage from '../assets/images/dips.muscles.jpg';

const ExerciseListPage = () => {
  return (
    <div>
      {/* Sección del título con imagen de fondo */}
      <div 
        className="relative bg-cover bg-center h-64 flex items-center justify-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          height: '300px',
          backgroundSize: 'cover',
          paddingTop: '100px',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="">Lista de Ejercicios</h1>
      </div>

      {/* Sección de la lista de ejercicios */}
      <div className="">
          <ExerciseList />
      </div>
    </div>
  );
};

export default ExerciseListPage;
