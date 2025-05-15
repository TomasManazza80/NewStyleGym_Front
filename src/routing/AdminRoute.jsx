import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Cambiado aquí
import AuthContext from '../store/store'; // Asegúrate de tener el contexto de autenticación
const API_URL = 'https://ecommerceback-server.onrender.com';



const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAdmin(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      try {
        const response = await axios.get(`${API_URL}/users/role/${decodedToken.email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userRole = response.data.role;
        setIsAdmin(userRole === 'admin');
      } catch (error) {
        console.error('Error retrieving user role:', error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [authCtx]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    alert("No tienes autorización para acceder a esta página.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
