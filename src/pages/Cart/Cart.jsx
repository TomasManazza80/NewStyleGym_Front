import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Remove, Update } from "../../store/redux/cart/CartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import authContext from "../../store/store";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3000";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const authCtx = useContext(authContext);

  const [error, setError] = useState("");
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setUpdatedCart(cart);
  }, [cart]);

  // const enviarEmail = () => {
  //   const templateParams = {
  //     user_email: email,
  //     user_cellphone: cellphone,
  //     user_address: address,
  //     message: `Productos en el carrito:\n${updatedCart.map(item => `Nombre: ${item.title}, Precio: ${item.price}, Cantidad: ${item.quantity}`).join('\n')}\n Esta es la información del usuario: \nCelular: ${cellphone}, Direccion: ${address}, Mensaje: ${message}`,
  //   };

  //   emailjs.send('service_nmujodf', 'template_3eofazh', templateParams, "K7qLi6I9SCwVn1oPA")
  //     .then((res) => {
  //       alert("Correo enviado correctamente.");
  //       console.log(res);
  //     }).catch((error) => {
  //       console.error("Error al enviar el correo:", error);
  //     });
  // };

  const createPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para realizar el pago.");
        return;
      }

      const decoded = jwtDecode(token);
      const totalAmount = updatedCart.reduce((a, c) => a + c.price * c.quantity, 0);

      await Promise.all(
        updatedCart.map(async (item) => {
          await axios.post(`${API_URL}/boughtProduct/boughtProduct`, {
            nombre: item.title,
            precio: item.price,
            cantidad: item.quantity,
            marca: item.id || "Marca Desconocida",
            categoria: item.category || "Categoría Desconocida",
            talle: item.size || "Talle Único",
          });
        })
      );

      enviarEmail();

      const response = await axios.post(`${API_URL}/payment/create_payment`, {
        product: {
          title: "Productos en el carrito",
          unit_price: totalAmount,
          quantity: 1,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Error al crear el pago:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isPaymentReady) {
      createPayment();
      setIsPaymentReady(false);
    }
  }, [isPaymentReady]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsPaymentReady(true);
  };

  const handleCheckout = () => {
    setShowForm(true);
  };

  const INCQuantityHandler = ({ id, quantity, price }) => {
    const newQuantity = quantity + 1;
    const item = { id, quantity: newQuantity, price };
    dispatch(Update(item));
  };

  const DECQuantityHandler = ({ id, quantity, price }) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const item = { id, quantity: newQuantity, price };
      dispatch(Update(item));
    } else {
      dispatch(Remove(id));
    }
  };

  const total = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const TotalPrice = total.toFixed(2);

  return (
    <div className="bg-gradient-to-r from-slate-400 to-slate-200 mt-14 text-center p-4 min-h-screen">
      <h1 className="font-bold text-2xl p-8 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="bg-white rounded-lg p-4 m-2 shadow-md">
                <h2 className="font-bold">{item.title}</h2>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => INCQuantityHandler(item)}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </button>
                  <button onClick={() => DECQuantityHandler(item)}>
                    <FontAwesomeIcon icon={faSquareMinus} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xl font-semibold">Total: ${TotalPrice}</p>

          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Pagar
          </button>

          {showForm && (
            <form onSubmit={handleFormSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
              <h3 className="text-lg font-semibold mb-4">Completa tus datos</h3>
              <input
                type="email"
                placeholder="Email"
                required
                className="block w-full p-2 mb-3 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Celular"
                required
                className="block w-full p-2 mb-3 border rounded"
                value={cellphone}
                onChange={(e) => setCellphone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Dirección"
                required
                className="block w-full p-2 mb-3 border rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <textarea
                placeholder="Mensaje (opcional)"
                className="block w-full p-2 mb-3 border rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Confirmar y pagar
              </button>
            </form>
          )}
        </>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        <NavLink to="/" className="text-blue-600 underline">
          Volver a la tienda
        </NavLink>
      </div>
    </div>
  );
}

export default Cart;
