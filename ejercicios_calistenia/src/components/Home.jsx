import './Home.css';
import imagen1 from '../assets/images/app-exercise.png'

const Home = () => {
    return (
        <div className="home">
            <div className="hero-1">
                <h1>Bienvenido a la API de Ejercicios</h1>

                <p>Explora nuestros recursos y mejora tu rutina de ejercicios.</p>
                <button className="cta-button">Comienza Ahora</button>
                <div className="icon-container">
                    <i className="fa-solid fa-check"></i> <b 
                        style={{
                        fontFamily:'verdana',
                        fontWeight: 700,
                        }}> API gratuito
                        </b>
                    
                    <i className="fa-solid fa-check"> </i> <b 
                        style={{
                        fontFamily:'verdana',
                        fontWeight: 700,
                        }}> 100s de ejercicios para seleccionar
                        </b>
                </div>
            </div>
            <div className="hero-2">
                <p>EXPLORA NUESTRAS BIBLIOTECAS</p>
                
            </div>
        </div>
    );
};

export default Home;
