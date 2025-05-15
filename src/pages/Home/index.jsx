import BuySteps from "../../components/BuyStepsCard/BuySteps.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Fproduct from "../../components/Fproduct/Fproduct.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import Products from "../Products/index.jsx";

import ProductsHome from "../Products/productsHome.jsx";



const HOME = () => {
  return (
    <>
      <div className="scroll-smooth focus:scroll-auto"> 
        <br />
        
       
        
    
  
       
<ProductsHome/>


        <button 
  onClick={() => window.location.href = '/products'}
  className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Ver Todos los Productos
</button>

      
        <br />  <br />
       
  
        <br />

   

      </div>
    </>
  );
};

export default HOME;
