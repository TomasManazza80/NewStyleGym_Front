import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Admin = () => {
  const getCurrentMonth = () => {
    const date = new Date();
    return date.getMonth() + 1;
  };

  // Estados para usuarios
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [todosMisProductos, setTodosMisProductos] = useState([]);
  const [seccionActiva, setSeccionActiva] = useState('Usuarios');
  const [searchTerm, setSearchTerm] = useState('');
  // Estados para precios de actividades
  const [preciosActividades, setPreciosActividades] = useState({
    musculacion3dias: 0,
    musculacion7dias: 0,
    sumba: 0,
    crossfit: 0,
    yoga: 0,
    pilates: 0,
    spinning: 0,
    boxeo: 0
  });
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(`${API_URL}/getAllUsers`);
        const usuarios = response.data;
        setTodosMisProductos(usuarios.map(usuario => ({
          id: usuario.id,
          nombre: usuario.name,
          numero: usuario.number,
          email: usuario.email,
          role: usuario.role,
          meses: usuario.meses,
          actividad: usuario.actividad,
          fechaCreacion: new Date(usuario.createdAt).toLocaleDateString(),
          fechaActualizacion: new Date(usuario.updatedAt).toLocaleDateString()
        })));
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    const obtenerPreciosActividades = async () => {
      try {
        const response = await axios.get(`${API_URL}/precios-actividades`);
        if (response.data) {
          setPreciosActividades(response.data);
        }
      } catch (error) {
        console.error('Error al obtener precios de actividades:', error);
      }
    };

    obtenerUsuarios();
    obtenerPreciosActividades();
  }, []);

  const filteredUsers = (users) => {
    return users.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.actividad.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEliminarProducto = async (ProductId) => {
    try {
      await axios.delete(`https://ecommerceback-haed.onrender.com/products/products/${ProductId}`);
      setTodosMisProductos(todosMisProductos.filter((producto) => producto.id !== ProductId));
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEditarProducto = async (productoActualizado) => {
    try {
      await axios.put(`https://ecommerceback-haed.onrender.com/products/products/${productoActualizado.id}`, productoActualizado);
      setTodosMisProductos(todosMisProductos.map(producto => 
        producto.id === productoActualizado.id ? productoActualizado : producto
      ));
      setProductoAEditar(null);
      window.location.reload();
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  const marcarMesPagado = async (userId) => {
    try {
      const mesActual = getCurrentMonth();
      await axios.post(`${API_URL}/marcar-mes-pagado`, { 
        userId, 
        mes: mesActual 
      });
      
      // Actualizar el estado local
      setTodosMisProductos(todosMisProductos.map(usuario => {
        if (usuario.id === userId) {
          return {
            ...usuario,
            meses: [...usuario.meses, mesActual]
          };
        }
        return usuario;
      }));
    } catch (error) {
      console.error('Error al marcar el mes como pagado:', error);
    }
  };

  const handleChangePrecio = (e) => {
    const { name, value } = e.target;
    setPreciosActividades({
      ...preciosActividades,
      [name]: Number(value)
    });
  };

  const guardarPreciosActividades = async () => {
    try {
      await axios.post(`${API_URL}/actualizar-precios`, preciosActividades);
      setMensajeExito('Precios actualizados correctamente');
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al guardar precios:', error);
    }
  };

  const EditarProducto = ({ producto, onGuardarCambios }) => {
    const [nombre, setNombre] = useState(producto.nombre);
    const [actividad, setActividad] = useState(producto.actividad);

    const handleGuardarCambios = () => {
      const productoActualizado = { ...producto, nombre, actividad };
      onGuardarCambios(productoActualizado);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Actividad</label>
              <input
                type="text"
                value={actividad}
                onChange={(e) => setActividad(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleGuardarCambios}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Guardar
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">
      <br />
      <br />
      <br />
      <h1 className="text-3xl font-bold mb-8">Dashboard de Administrador</h1>

      <nav className="mb-8 flex flex-wrap gap-2">
        {['Usuarios', 'Abonados', 'No Abonados', 'Precios Actividades'].map((section, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded ${seccionActiva === section ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setSeccionActiva(section)}
          >
            {section}
          </button>
        ))}
      </nav>

      {seccionActiva === 'Usuarios' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Usuarios del Gimnasio</h2>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <ul className="bg-white shadow-md rounded-lg p-4">
            {filteredUsers(todosMisProductos).map((usuario) => (
              <li key={usuario.id} className="border-b last:border-none py-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{usuario.nombre}</span>
                  <span className="text-gray-600">
                    Último mes pagado: {usuario.meses[usuario.meses.length - 1] || 'No hay pagos registrados'}
                  </span>
                  <span className="text-gray-600">Actividad: {usuario.actividad}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setProductoAEditar(usuario)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar Actividad
                  </button>
                  <button
                    onClick={() => marcarMesPagado(usuario.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Marcar Mes Pagado
                  </button>
                  <button
                    onClick={() => handleEliminarProducto(usuario.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {productoAEditar && <EditarProducto producto={productoAEditar} onGuardarCambios={handleEditarProducto} />}
        </section>
      )}

      {seccionActiva === 'Abonados' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Usuarios Abonados (Mes Actual)</h2>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <ul className="bg-white shadow-md rounded-lg p-4">
            {filteredUsers(todosMisProductos.filter(usuario => {
              const ultimoMesPagado = usuario.meses[usuario.meses.length - 1];
              return ultimoMesPagado === getCurrentMonth();
            })).map((usuario) => (
              <li key={usuario.id} className="border-b last:border-none py-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{usuario.nombre}</span>
                  <span className="text-gray-600">
                    Último mes pagado: {usuario.meses[usuario.meses.length - 1] || 'No hay pagos registrados'}
                  </span>
                  <span className="text-gray-600">Actividad: {usuario.actividad}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setProductoAEditar(usuario)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar Actividad
                  </button>
                  <button
                    onClick={() => handleEliminarProducto(usuario.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {seccionActiva === 'No Abonados' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Usuarios No Abonados (Mes Actual)</h2>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <ul className="bg-white shadow-md rounded-lg p-4">
            {filteredUsers(todosMisProductos.filter(usuario => {
              const ultimoMesPagado = usuario.meses[usuario.meses.length - 1];
              return ultimoMesPagado !== getCurrentMonth();
            })).map((usuario) => (
              <li key={usuario.id} className="border-b last:border-none py-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{usuario.nombre}</span>
                  <span className="text-gray-600">
                    Último mes pagado: {usuario.meses[usuario.meses.length - 1] || 'No hay pagos registrados'}
                  </span>
                  <span className="text-gray-600">Actividad: {usuario.actividad}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setProductoAEditar(usuario)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar Actividad
                  </button>
                  <button
                    onClick={() => marcarMesPagado(usuario.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Marcar Mes Pagado
                  </button>
                  <button
                    onClick={() => handleEliminarProducto(usuario.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {seccionActiva === 'Precios Actividades' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Gestión de Precios de Actividades</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            {mensajeExito && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {mensajeExito}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ... (resto del código de precios de actividades permanece igual) ... */}
            </div>

            <button
              onClick={guardarPreciosActividades}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Guardar Precios
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Admin;