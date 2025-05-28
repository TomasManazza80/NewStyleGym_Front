import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [mesesPagados, setMesesPagados] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mesActual, setMesActual] = useState('');
  const [userId, setUserId] = useState(null);
  const [userActivity, setUserActivity] = useState('');
  const [activityPrice, setActivityPrice] = useState(null);
  const [prices, setPrices] = useState({
    unaActividad: 0,
    paseLibre: 0,
    estudiante3dias: 0
  });

  useEffect(() => {
    const obtenerMesActual = () => {
      const mes = new Date().toLocaleString('es-ES', { month: 'long' });
      return mes.charAt(0).toUpperCase() + mes.slice(1);
    };
  
    setMesActual(obtenerMesActual());
  
    const obtenerUserId = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No hay token de autenticación');
        return;
      }
  
      try {
        // Obtener precios de actividades primero
        const pricesResponse = await axios.get(`${API_URL}/api/activity-prices/prices`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        
        const pricesData = pricesResponse.data;
        setPrices({
          unaActividad: parseFloat(pricesData.unaActividad),
          paseLibre: parseFloat(pricesData.paseLibre),
          estudiante3dias: parseFloat(pricesData.estudiante3dias)
        });

        // Obtener información del usuario
        const decoded = jwtDecode(token);
        const response = await axios.get(`${API_URL}/getId/${decoded.email}`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
  
        setUserId(response.data);
        const id = response.data;
        
        const activityResponse = await axios.get(`${API_URL}/getActivity/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      
        const activity = activityResponse.data;
        setUserActivity(activity);

        // Calcular precio según la actividad del usuario
        let price = 0;
        if (activity === '1 actividad') {
          price = pricesData.unaActividad;
        } else if (activity === 'pase libre') {
          price = pricesData.paseLibre;
        } else if (activity === 'Estudiante') {
          price = pricesData.estudiante3dias;
        } else {
          console.error('Actividad no reconocida:', activity);
          setError(`Actividad no reconocida: ${activity}`);
        }

        setActivityPrice(parseFloat(price));
    
        // Obtener meses pagados
        const mesesResponse = await axios.get(`${API_URL}/getMounts/${response.data}`, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
  
        setMesesPagados(mesesResponse.data.meses || []);
  
      } catch (error) {
        console.error('Error completo:', error);
        if (error.response?.status === 404) {
          setError('Usuario no encontrado. Verifique su correo electrónico.');
        } else if (error.code === 'ERR_NETWORK') {
          setError('Error de conexión. Asegúrese que el servidor esté funcionando en http://localhost:3000');
        } else {
          setError(error.message || 'Error al obtener información del usuario');
        }
      }
    };
  
    obtenerUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const obtenerMesesPagados = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/getMounts/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          setMesesPagados(response.data.meses || []);
        } catch (error) {
          console.error('Error al obtener meses:', error);
          setError('Error al obtener los meses pagados');
        }
      };

      obtenerMesesPagados();
    }
  }, [userId]);

  const handlePagar = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Debes iniciar sesión para realizar el pago.');
        return;
      }

      if (activityPrice === 0) {
        throw new Error(`Actividad no válida: ${userActivity}`);
      }

      const response = await axios.post(`${API_URL}/payment/create_payment`, {
        product: {
          title: `Cuota ${mesActual} - ${userActivity}`,
          unit_price: activityPrice,
          quantity: 1,
          userId: userId
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const paymentUrl = response.data.init_point || response.data.payment_url || response.data.url;
      
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error('No se recibió el enlace de pago');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError(error.message.includes('Actividad no válida') ? error.message : 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  const mesPagado = mesesPagados.includes(mesActual);

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-xl mx-auto mt-[150px]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Estado de Pagos</h2>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Mes Actual: {mesActual}</h3>
          {userActivity && (
            <div>
              <p className="text-md text-gray-600 mt-2">Actividad: {userActivity}</p>
              <p className="text-md text-gray-600 mt-1">Precio: ${activityPrice?.toLocaleString('es-AR')}</p>
            </div>
          )}
          <div className="mt-2">
            {mesPagado ? (
              <span className="inline-flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" /> Pagado
              </span>
            ) : (
              <button
                onClick={handlePagar}
                disabled={loading || activityPrice === 0}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow transition-all disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Pagar Mes Actual'}
              </button>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-lg font-semibold text-center text-gray-600 mb-4">Historial de Pagos</h4>
          {mesesPagados.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mesesPagados.map((mes) => (
                <div
                  key={mes}
                  className="bg-green-100 text-green-800 rounded-lg px-4 py-2 text-center shadow-sm border border-green-200"
                >
                  <div className="font-medium">{mes}</div>
                  <div className="mt-1 flex items-center justify-center">
                    <span className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" /> Pagado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No hay meses pagados</p>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 mt-4 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Products;