import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const API_URL = 'https://ecommerceback-server.onrender.com';

const Fproduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 1000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40,
        },
        mobile: {
            breakpoint: { max: 1000, min: 0 },
            items: 1,
            partialVisibilityGutter: 20,
        },
        tablet: {
            breakpoint: { max: 1000, min: 600 },
            items: 2,
            partialVisibilityGutter: 30,
        },
    };

    if (loading) {
        return <div className="text-center p-4">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl text-center mb-8 font-semibold text-gray-900 tracking-wide">
                Productos Destacados
            </h1>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlay
                autoPlaySpeed={1000} // Cambiado a 1000 milisegundos (1 segundo)
                centerMode={false}
                containerClass="container-with-dots"
                dotListClass="flex justify-center mt-6"
                draggable
                focusOnSelect={false}
                infinite
                itemClass="p-4"
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                showDots={false}
                sliderClass=""
                slideToSlide={1}
                swipeable
            >
                {products.map((product, index) => (
                    <div key={index} className="text-center">
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden w-64 h-64 mx-auto transition-transform duration-300 hover:scale-105">
                            <img
                                src={product.imagenes}
                                alt={product.nombre || "Producto"}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="mt-4">
                            <h1 className="text-lg font-semibold text-gray-900 mb-2 tracking-wide">
                                {product.nombre ? product.nombre.slice(0, 20) : 'Sin Nombre'}
                            </h1>
                            <h1 className="text-2xl text-blue-700 font-bold tracking-wide">${product.precio}</h1>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Fproduct;