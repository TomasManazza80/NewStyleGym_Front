import React, { useState } from "react";
import logo from "../../images/logoBlanco.png";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    console.log("Subscribed with email:", email);
    setEmailError("");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 w-full" style={{ borderRadius: "20px" }}> 
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Columna 1: Logo e Información */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Logo" className="w-[300px] h-auto " style={{ margin: "0 auto", padding: "0px" }}/>
          <p className="text-sm text-gray-400 text-center md:text-left">
            Tu destino para la moda y el estilo.
          </p>
        </div>

        {/* Columna 2: Enlaces de Interés */}
        

        {/* Columna 3: Información de Contacto y Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <div className="flex items-center mb-1">
            <FaEnvelope className="mr-2" />
            <a href="mailto:info@empresa.com" className="hover:text-gray-300 text-sm">
              info@empresa.com
            </a>
          </div>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" />
            <a href="tel:+1234567890" className="hover:text-gray-300 text-sm">
              +1234567890
            </a>
          </div>
         
        </div>

        {/* Columna 4: Suscripción */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Suscríbete</h3>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className={`border border-gray-600 rounded-md px-3 py-2 bg-gray-800 text-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-sm ${
                emailError ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-700 text-sm"
              onClick={handleSubscribe}
            >
              Suscribirse
            </button>
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
        </div>
      </div>

      {/* Derechos de Autor */}
      <div className="text-center mt-6 border-t border-gray-800 pt-3">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Tomas Manazza. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;