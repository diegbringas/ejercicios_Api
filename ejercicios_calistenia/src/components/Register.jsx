import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                password,
                first_name: firstName,
            });
            alert(response.data.message);
            navigate('/add-exercise');
        } catch (error) {
            alert(error.response.data.description || "Error en el registro.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h1>Registro</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
