import React from 'react';
import img from '../../images/logoG.png';


const ProductsHome = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO SECTION - FULL SCREEN */}
      <section 
        id="home" 
        className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          // backgroundImage: `url(${gymBg})`,
          margin: 0,
          marginTop: 50,
          padding: 0,
          color: 'white',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <img src={img} className="mx-auto mb-8 w-[400px] h-auto" alt="Logo" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">NEW STYLE</h1>
            <h2 className="text-2xl md:text-3xl mb-8">CENTRO FITNESS</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#feature" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300">
                COMENZAR
              </a>
              <a href="#about" className="border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-full transition duration-300">
                INFORMACIÓN
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section id="feature" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl font-bold mb-4">COMIENZA HOY MISMO</h2>
              <h3 className="text-xl mb-6">Membresias desde $10.000</h3>
              <p className="mb-6">Contamos con los mejores precios de la ciudad</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300">
                CONSULTAR PRECIOS
              </button>
            </div>
            
            <div className="lg:w-1/2 bg-gray-700 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">HORARIOS:</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">Lunes - Viernes</h3>
                  <p>7:00 - 22:00</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sábados</h3>
                  <p>10:00 - 14:00</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Domingos</h3>
                  <p>Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Quienes somos</h1>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Tu bienestar es nuestra prioridad. Nuestro equipo de profesionales te brindará la atención personalizada que necesitas para alcanzar tus objetivos.
          </p>
          <p className="max-w-2xl mx-auto mb-12 text-lg">
            ¿Poco tiempo? Nuestra nueva ubicación te ofrece fácil acceso y un entorno tranquilo para concentrarte en tu entrenamiento.
          </p>
          
          <h1 className="text-4xl font-bold mb-12">¡Nuestro Equipo!</h1>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Mónica */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs">
              <img src="images/team/monifoto.png" className="w-full h-64 object-cover rounded mb-4" alt="Mónica Rosales" />
              <h3 className="text-xl font-bold">Mónica Rosales</h3>
              <p className="text-gray-600 mb-2">Dody Jump Trainer</p>
              <p className="text-gray-600 mb-4">Gym Coach</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-yellow-500 text-xl"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-700 hover:text-yellow-500 text-xl"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
            
            {/* Agustín */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs">
              <img src="images/team/agus.png" className="w-full h-64 object-cover rounded mb-4" alt="Agustín Nardoni" />
              <h3 className="text-xl font-bold">Agustín Nardoni</h3>
              <p className="text-gray-600 mb-4">Gym Coach</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-yellow-500 text-xl"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-700 hover:text-yellow-500 text-xl"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            
            {/* María */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs">
              <img src="images/team/fotomari.jpeg" className="w-full h-64 object-cover rounded mb-4" alt="María Giovagnoli" />
              <h3 className="text-xl font-bold">María Giovagnoli</h3>
              <p className="text-gray-600 mb-4">Gym Coach</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-yellow-500 text-xl"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-700 hover:text-yellow-500 text-xl"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLASSES SECTION */}
      <section id="class" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¡MEJORA TU RENDIMIENTO!</h2>
            <h3 className="text-4xl font-bold">NUESTRAS CLASES</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Body Jump */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src="images/class/bodyjump.jpg" className="w-full h-48 object-cover" alt="Body Jump" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Body Jump</h3>
                <p className="text-gray-600 mb-4">Clases Coordinadas - Mónica</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Perder peso de forma más rápida y efectiva</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Mejorar tu salud cardiovascular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Aumentar tu energía y bienestar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Reducir el estrés y mejorar tu estado de ánimo</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Funcional */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src="images/class/funcional.webp" className="w-full h-48 object-cover" alt="Funcional" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Funcional</h3>
                <p className="text-gray-600 mb-4">Clases Coordinadas - Agustín</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Quemarás calorías de forma eficiente y rápida</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Tonificarás tu cuerpo de manera integral</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Mejorarás tu fuerza y resistencia muscular</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Aumentarás tu flexibilidad y movilidad</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Zumba */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src="images/class/zumba1.jpeg" className="w-full h-48 object-cover" alt="Zumba" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Zumba</h3>
                <p className="text-gray-600 mb-4">Clases Coordinadas</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Reduce el estrés y aumenta la felicidad</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Aumenta la energía y el bienestar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Ideal para todos los niveles de condición física</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Fortalece el corazón y mejora la circulación</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Body Balance */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src="images/class/bodibalance.jpg" className="w-full h-48 object-cover" alt="Body Balance" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Body Balance</h3>
                <p className="text-gray-600 mb-4">Clases Coordinadas - Mónica</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Mejora la flexibilidad y el equilibrio</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Reduce el estrés y promueve la relajación</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Aumenta la fuerza muscular y la resistencia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">◉</span>
                    <span>Mejora la postura y la alineación corporal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      <section id="schedule" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Actividades</h2>
            <h3 className="text-4xl font-bold">Horarios de Clases</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-4 px-6"><i className="far fa-clock mr-2"></i>Hora</th>
                  <th className="py-4 px-6">Lunes</th>
                  <th className="py-4 px-6">Martes</th>
                  <th className="py-4 px-6">Miércoles</th>
                  <th className="py-4 px-6">Jueves</th>
                  <th className="py-4 px-6">Viernes</th>
                  <th className="py-4 px-6">Sábado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {/* Filas de horarios... */}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h2 className="text-3xl font-bold mb-6">CONTACTO</h2>
              <form className="space-y-4">
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                  placeholder="Tu Nombre" 
                />
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                  placeholder="Tu Email" 
                />
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                  rows="5" 
                  placeholder="Mensaje"
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  ENVIAR
                </button>
              </form>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">NOS PODES ENCONTRAR EN:</h2>
              <p className="text-xl mb-8 text-center lg:text-left">📍 Gdor.Cespo 2427</p>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.7117452533216!2d-60.705914025045125!3d-31.641741907180513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5a9bc700ed787%3A0x25a926cb4788b434!2sGdor.%20Crespo%202427%2C%20S3000BFI%20Santa%20Fe%20de%20la%20Vera%20Cruz%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1731453478458!5m2!1ses!2sar" 
                  width="100%" 
                  height="400" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">Copyright &copy; 2024 New Style Gym.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <p className="flex items-center">
                <i className="far fa-envelope mr-2"></i>
                <a href="#" className="hover:text-yellow-400">sleagus_4@gmail.com</a>
              </p>
              <p className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>342-5406918</span>
              </p>
            </div>
            
            <p className="mt-4 md:mt-0 text-sm">
              Designed by: <a href="https://www.linkedin.com/in/tomasmanazza/" className="text-yellow-400 hover:underline">Tomás Manazza</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsHome;