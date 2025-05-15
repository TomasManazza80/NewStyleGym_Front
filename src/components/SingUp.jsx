import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  textAlign: 'center'
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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  
  const [hover, setHover] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/createuser', {
      name: username,
      email: email,
      password: password,
      number: number
    })
    .then(function (response) {
      console.log(response);
      toast.success('¡Usuario creado exitosamente!');
    })
    .catch(function (error) {
      console.log(error);
      toast.error('Hubo un error al crear el usuario.');
    });

    // Restablecer el formulario
    setUsername("");
    setEmail("");
    setPassword("");
    setNumber("");
  };

  const redireccionar = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle} className="signup-container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle} className="form-group">
          <label style={labelStyle} htmlFor="username">Nombre de usuario</label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={formGroupStyle} className="form-group">
          <label style={labelStyle} htmlFor="email">Correo electrónico</label>
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
        <div style={formGroupStyle} className="form-group">
          <label style={labelStyle} htmlFor="number">Número</label>
          <input
            style={inputStyle}
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={hover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Registrar
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
};

export default SignUp;
