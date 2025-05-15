import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

const Products = () => {
  const [mesesPagados, setMesesPagados] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerMesesPagados = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/getMounts/3', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Meses pagados:', response.data.meses);
        setMesesPagados(response.data.meses || []);
      } catch (error) {
        console.error('Error al obtener meses:', error);
        setError('Error al obtener los meses pagados');
      }
    };

    obtenerMesesPagados();
  }, []);

  const handlePagar = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/create_payment', {
        product: {
          title: 'Cuota Mensual',
          unit_price: 100,
          quantity: 1,
          userId: 3
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Redirigir a la página de pago de MercadoPago
      if (response.data.preferenceId) {
        window.location.href = response.data.init_point;
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-xl mx-auto mt-[150px]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Meses Pagados</h2>

      <div className="bg-white rounded-xl shadow-md p-4">
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

        <div className="mt-6 text-center">
          <button
            onClick={handlePagar}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow transition-all disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Pagar Mes'}
          </button>
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