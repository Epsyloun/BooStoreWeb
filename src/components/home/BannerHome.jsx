import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGamepad, FaHeadphones, FaKeyboard, FaMouse } from "react-icons/fa";

export default function BannerHome() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      navigate("/products");
    }, 800);
  };

  return (
    <div className="relative bg-dark h-[400px] flex flex-col items-center justify-center text-center mt-8 rounded-lg shadow-lg p-8 w-[90%]">
      <h1 className="text-6xl font-bold text-white font-title">
        Bienvenido a Boo Store
      </h1>
      <p className="text-lg text-white mb-8">
        Tu tienda de confianza para todos tus productos
      </p>
      <div className="flex gap-4">
        <div className="relative group">
          {/* Iconos flotantes */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isClicked ? "" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`}
          >
            <FaGamepad
              className={`absolute text-primary text-xl ${isClicked ? "animate-icon-bounce-1" : "animate-float-1"} -top-6 -left-2`}
            />
            <FaHeadphones
              className={`absolute text-secondary text-xl ${isClicked ? "animate-icon-bounce-2" : "animate-float-2"} -top-4 -right-2`}
            />
            <FaKeyboard
              className={`absolute text-primary text-lg ${isClicked ? "animate-icon-bounce-3" : "animate-float-3"} -bottom-6 -left-4`}
            />
            <FaMouse
              className={`absolute text-secondary text-lg ${isClicked ? "animate-icon-bounce-4" : "animate-float-4"} -bottom-5 -right-3`}
            />
          </div>

          <button
            onClick={handleClick}
            className="relative bg-primary text-white px-6 py-3 rounded-lg font-semibold 
              shadow-[0_0_15px_rgba(153,41,234,0.5)] 
              hover:shadow-[0_0_25px_rgba(153,41,234,0.8),0_0_50px_rgba(153,41,234,0.4)]
              hover:scale-105
              transition-all duration-300
              animate-pulse-glow"
          >
            Ver Productos
          </button>
        </div>
        <button
          onClick={() => navigate("/about")}
          className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
