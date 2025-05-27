import React from 'react';

const ProductCart = ({ id, name, price, image, imageClass }) => {
  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center w-64">
      <div className={`bg-white flex items-center justify-center ${imageClass}`}>
        <img src={image} alt={name} className="object-contain w-full h-full" />
      </div>
      <div className="mt-2">
        <h1 className="text-xl text-black">{name}</h1>
        <h2 className="text-lg text-blue-500">{price}</h2>
        <h3 className="text-md font-bold text-blue-500">10% Off</h3>
      </div>
    </div>
  );
};

export default ProductCart;
