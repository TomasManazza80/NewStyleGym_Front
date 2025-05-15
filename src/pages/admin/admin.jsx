import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const API_URL = 'https://ecommerceback-haed.onrender.com';


const Admin = () => {
  // Estados iniciales y configuraciones
  const [showForm, setShowForm] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [todosMisProductos, setTodosMisProductos] = useState([]);
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: 0,
    marca: '',
    categoria: '',
    cantidad: 0,
    talle: '',
    imagenes: []
  });
  const [recaudado, setRecaudado] = useState(0);
  const [seccionActiva, setSeccionActiva] = useState('productos');

  const categorias = [
    'remeras',
    'pantalones',
    'abrigos',
    'calzados',
    'ropa interior',
    'camisas',
    'accesorios'
  ];
  const recargarPagina = () => {
    window.location.reload();
  };

  const talle = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const cloudinary = new Cloudinary({ cloud: { cloudName: 'dxvkqumpu' } });

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`https://ecommerceback-haed.onrender.com/products/products`);
        setTodosMisProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    const obtenerProductosVendidos = async () => {
      try {
        const response = await axios.get(`https://ecommerceback-haed.onrender.com/boughtProduct/AllboughtProducts`);
        
        setProductosVendidos(response.data);
        console.log("!!estos son los productos vendidos: ", response.data);
      } catch (error) {
        console.error('Error al obtener los productos vendidos:', error);
      }
    };
    
    obtenerProductosVendidos();
    obtenerProductos();
  }, []);



  // Funciones adicionales

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
    try {
      const urls = await Promise.all(uploadPromises);
      setNuevoProducto({ ...nuevoProducto, imagenes: urls });
    } catch (error) {
      console.error('Error al subir las imágenes a Cloudinary:', error);
    }
  };

 const uploadImageToCloudinary = async (file) => {
   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', 'ecommerce');
 
   try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/dxvkqumpu/image/upload`, formData);
     return response.data.secure_url;
   } catch (error) {
     console.error('Error al subir la imagen a Cloudinary:', error);
     return null;
   }
 };

 const handleAgregarProducto = async () => {
  try {
    const response = await axios.post(`https://ecommerceback-haed.onrender.com/products/products`, nuevoProducto);
    setTodosMisProductos([...todosMisProductos, response.data]);
    setRecaudado((prevRecaudado) => prevRecaudado + nuevoProducto.precio * nuevoProducto.cantidad);
    setNuevoProducto({ nombre: '', precio: 0, marca: '', categoria: '', cantidad: 0, talle: '', imagenes: [] });
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
};

const handleEditarProducto = async (productoActualizado) => {
  try {
    const response = await axios.put(`https://ecommerceback-haed.onrender.com/products/products/${productoActualizado.ProductId}`, productoActualizado);
    setTodosMisProductos(todosMisProductos.map((producto) => (producto.id === productoActualizado.id ? response.data : producto)));
    setShowForm(false);
  } catch (error) {
    console.error('Error al editar el producto:', error);
  }
};

const handleEliminarProducto = async (ProductId, precio, cantidad) => {
   
  try {
    const response = await axios.delete(`https://ecommerceback-haed.onrender.com/products/products/${ProductId}`);
    setTodosMisProductos(todosMisProductos.filter((producto) => producto.id !== ProductId));
    setRecaudado((prevRecaudado) => prevRecaudado - precio * cantidad);
    recargarPagina();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

const descontarStock = async (id, cantidad, id_delete) => {
  try {
    const id_ok = id;
    console.log("ESTE ES EL ID DE MI PRODUCTO $$$$$$$$$$$$$$ ", id_ok);

    const response = await axios.put(`https://ecommerceback-haed.onrender.com/products/products/update-quantity/${id_ok}`, {
      quantityToDiscount: cantidad,
    });
    console.log(response.data);
    handleEliminarProductoVendido(id_delete);
  } catch (error) {
    console.error('Error al descontar stock:', error);
  }
};



const handleEliminarProductoVendido = async (id) => {
  try {
    await axios.delete(`https://ecommerceback-haed.onrender.com/boughtProduct/${id}`);
    setProductosVendidos((prevProductosVendidos) => prevProductosVendidos.filter((producto) => producto.id !== id));
    recargarPagina();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
};


const EditarProducto = ({ producto, onGuardarCambios }) => {
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [marca, setMarca] = useState(producto.marca);
  const [categoria, setCategoria] = useState(producto.categoria);
  const [cantidad, setCantidad] = useState(producto.cantidad);
  const [talle, setTalle] = useState(producto.talle);

  const handleGuardarCambios = () => {
    const productoActualizado = { ...producto, nombre, precio, marca, categoria, cantidad, talle };
    onGuardarCambios(productoActualizado);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div className="p-4 border border-gray-300 rounded shadow-md bg-white max-w-md w-full h-full relative">
        <form>
          {['nombre', 'precio', 'marca', 'categoria', 'cantidad', 'talle'].map((field, idx) => (
            <label key={idx} className="block mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type={field === 'precio' || field === 'cantidad' ? 'number' : 'text'}
                value={field === 'nombre' ? nombre : field === 'precio' ? precio : field === 'marca' ? marca : field === 'categoria' ? categoria : field === 'cantidad' ? cantidad : talle}
                onChange={(e) =>
                  field === 'nombre'
                    ? setNombre(e.target.value)
                    : field === 'precio'
                    ? setPrecio(e.target.value)
                    : field === 'marca'
                    ? setMarca(e.target.value)
                    : field === 'categoria'
                    ? setCategoria(e.target.value)
                    : field === 'cantidad'
                    ? setCantidad(e.target.value)
                    : setTalle(e.target.value)
                }
                className="block w-full p-2 mt-1 border border-gray-300 rounded"
              />
            </label>
          ))}
        </form>
        <div className="mt-4 flex">
          <button onClick={handleGuardarCambios} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Guardar cambios
          </button>
          <button onClick={() => recargarPagina()} className="bg-red-500 text-white px-4 py-2 ml-2 rounded hover:bg-red-600">
            Cerrar
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

    <nav className="mb-8">
      {['productos', 'cargar', 'ventas'].map((section, idx) => (
        <button
          key={idx}
          className={`mr-4 px-4 py-2 rounded ${seccionActiva === section ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSeccionActiva(section)}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)} 
        </button>
      ))}
    </nav>

    {seccionActiva === 'productos' && (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Todos Mis Productos</h2>
        <ul className="bg-white shadow-md rounded-lg p-4">
        {todosMisProductos.map((producto) => {
            const imgs = producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes : [];

            return (
              <li key={producto.id} className="border-b last:border-none py-2 flex justify-between items-center">
                <span>
                  {producto.nombre} - ${producto.precio} - {producto.marca} - {producto.categoria} - Cantidad: {producto.cantidad}
                </span>
                {imgs.length > 0 && (
                  <div>
                    <img src={imgs[0]} alt="" width="150" className="" />
                  </div>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEliminarProducto(producto.ProductId, producto.precio, producto.cantidad)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => setProductoAEditar(producto)}
                    className="bg-blue-500 text-white px-4 py-1 rounded ml-2"
                  >
                    Editar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {productoAEditar && <EditarProducto producto={productoAEditar} onGuardarCambios={handleEditarProducto} />}
      </section>
    )}

    {seccionActiva === 'ventas' && (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Productos Vendidos</h2>
        <ul className="bg-white shadow-md rounded-lg p-4">
          {productosVendidos.map((producto) => {
            const imgs = producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes : [];

            return (
              <li key={producto.id} className="border-b last:border-none py-2 flex justify-between items-center">
                <span>
                  {producto.nombre} - ${producto.precio} - {producto.marca} - {producto.categoria} - Cantidad: {producto.cantidad}
                </span>
                {imgs.length > 0 && (
                  <div>
                    <img src={imgs[0]} alt="" width="150" className="" />
                  </div>
                )}
                <div className="flex space-x-2">
                <button
                    onClick={() => descontarStock(producto.marca,  producto.cantidad, producto.ProductId)}   
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    Confirmar Venta
                  </button>
                  <button
                    onClick={() => handleEliminarProductoVendido(producto.ProductId)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    )}

    {seccionActiva === 'cargar' && (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cargar Producto</h2>
        <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
          <div>
            <label className="block font-medium mb-2">Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              className="w-full p-2 border rounded"
              value={nuevoProducto.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Precio del producto</label>
            <input
              type="number"
              name="precio"
              placeholder="Precio del producto"
              className="w-full p-2 border rounded"
              value={nuevoProducto.precio}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Marca</label>
            <input
              type="text"
              name="marca"
              className="w-full p-2 border rounded"
              value={nuevoProducto.marca}
              onChange={handleInputChange}
            />
          </div>
         <div>
  <label className="block font-medium mb-2">Categoría</label>
  <input
    type="text"
    name="categoria"
    className="w-full p-2 border rounded"
    value={nuevoProducto.categoria}
    onChange={handleInputChange}
    list="categorias" // para mostrar sugerencias basadas en la lista de categorías
  />
  <datalist id="categorias">
    {categorias.map((cat, index) => (
      <option key={index} value={cat} />
    ))}
  </datalist>
</div>

          <div>
            <label className="block font-medium mb-2">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              className="w-full p-2 border rounded"
              value={nuevoProducto.cantidad}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Talle</label>
            <input
              type="text"
              name="talle"
              placeholder="Talle"
              className="w-full p-2 border rounded"
              value={nuevoProducto.talle}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Imagen del producto</label>
            <input
              type="file"
              name="imagenes"
              className="w-full p-2 border rounded"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <button onClick={handleAgregarProducto} className="bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Producto
          </button>
        </div>
      </section>
    )}

   
    
  </div>
);
};

export default Admin;
