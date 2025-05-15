import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import gif from "../../images/fondo.gif";

const BuySteps = () => {
  const steps = [
    {
      icon: faSearch,
      title: "1. Encuentra tu Producto",
      description: "Explora nuestro catálogo y selecciona el artículo deseado.",
    },
    {
      icon: faUser,
      title: "2. Cantidad y Confirmación",
      description: "Ajusta la cantidad y procede a la compra.",
    },
    {
      icon: faShoppingCart,
      title: "3. Pago Seguro",
      description: "Utiliza tu tarjeta de crédito o débito para un pago rápido y seguro.",
    },
  ];

  return (
    <section
      className="relative w-11/12 md:w-10/12 lg:w-9/12 mx-auto py-16 rounded-3xl overflow-hidden"
      style={{ backgroundImage: `url(${gif})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center text-white">
        <div className="mb-8">
          <FontAwesomeIcon icon={faShoppingCart} className="text-5xl md:text-6xl mb-4 text-white" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Proceso de Compra Simplificado</h2>
          <p className="mt-2 text-lg md:text-xl font-light">Sigue estos sencillos pasos para completar tu pedido.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16">
          {steps.map((step, index) => (
            <article key={index} className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-white bg-opacity-20 mb-4">
                <FontAwesomeIcon icon={step.icon} className="text-4xl md:text-5xl text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-base md:text-lg font-light">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuySteps;