import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">CALISPEDIA</div>
            <ul className="nav-links">
                <li><a href="#home">Inicio</a></li>
                <li><a href="#exercises">Ejercicios</a></li>
                <li><a href="#workouts">Rutinas</a></li>
                <li><a href="#contact">LOGIN</a></li>
                <li><a href="#contact">REGISTRATE</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
