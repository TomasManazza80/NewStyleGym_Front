import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../images/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import gif from '../../images/fondo.gif';
import '../../index.css'; // Import the CSS file

function Hero() {
  return (
    <>
    <br />
    <br />
    
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">INDUMENTARIA INFANTIL</h1>
          <h3 className="hero-subtitle">Envios a todo el país</h3>
          <button className="hero-button">Comprar Ahora</button>
          <Link to="/" className="hero-link">Información</Link>
        </div>
        <div className="hero-image" style={{position: 'relative', top: '20px'}}>
          <img src={BannerImage} alt="logo" />
        </div>
        <div className="hero-icon">
          <FontAwesomeIcon icon={faAngleDown} className="icon bounce" style={{ color: 'black' }} />
          
        </div>
      </div>
    </>
  );
}

export default Hero;
