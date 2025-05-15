import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f2f2f2'
};

const formStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff'
};

const formGroupStyle = {
  marginBottom: '15px',
  textAlign: 'left'
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '3px'
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  textTransform: 'uppercase',
  cursor: 'pointer',
  margin: '5px',
  transition: 'background-color 0.3s ease'
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3'
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes añadir la lógica para manejar el inicio de sesión
    axios.post('http://localhost:3000/login', { email, password })
      .then(function (response) {
        console.log(response);
        toast.success('¡Inicio de sesión exitoso!');
      })
      .catch(function (error) {
        console.log(error);
        toast.error('Hubo un error al iniciar sesión.');
      });
  };

  const redireccionar = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle} className="form-group">
          <label style={labelStyle} htmlFor="email">Correo Electrónico</label>
          <input
            style={inputStyle}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={formGroupStyle} className="form-group">
          <label style={labelStyle} htmlFor="password">Contraseña</label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={redireccionar}
        >
          Volver al Inicio
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
