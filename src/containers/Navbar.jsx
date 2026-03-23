import { Fragment } from "react";
import MainSearchTextField from "../components/generic/MainSearchTextField";
import ImageBox from "../components/generic/ImageBox";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UrlLinks = [
  { name: "Estuche", path: "/products/:cases" },
  { name: "Repuestos", path: "/products/:replace" },
  { name: "Accesorios", path: "/products/:accessories" },
];

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      {/* Spacer para ocupar el espacio del navbar fixed */}
      <div className="h-16"></div>

      {/* Navbar fixed */}
      <div className="flex justify-center bg-navbar backdrop-blur-sm border-b border-primary/40 shadow-[0_4px_30px_rgba(153,41,234,0.25)] fixed top-0 left-0 w-full z-50 h-16 px-4">
        <div className="flex items-center gap-4 py-4 w-[90%]">
          <div className="text-white flex-[auto] gap-2 flex flex-row justify-self-start items-center">
            <ImageBox
              src="/src/assets/images/boo_logo.png"
              alt="Logo de Boo Store"
              sx={{
                width: 40,
                height: 40,
              }}
            />{" "}
            boo store
          </div>
          <div className="text-white flex-[50%] ">
            <MainSearchTextField />
          </div>
          <div className="text-white flex-[30%] flex justify-evenly items-center">
            {UrlLinks.map((link, index) => (
              <Fragment key={link.name}>
                <a
                  onClick={() => navigate(link.path)}
                  className="cursor-pointer relative px-2 py-1 text-white transition-all duration-300 
                hover:text-primary hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(153,41,234,0.8)]
                before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] 
                before:bg-gradient-to-r before:from-primary before:to-secondary before:transition-all before:duration-300
                hover:before:w-full"
                >
                  {link.name}
                </a>
                {index < UrlLinks.length - 1 && (
                  <span className="text-gray-400">|</span>
                )}
              </Fragment>
            ))}
          </div>
          <div className="text-white flex-1 justify-center flex ">
            <FaShoppingCart className="text-2xl cursor-pointer transition-all duration-300 hover:text-primary hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(153,41,234,0.8)]" />
          </div>
        </div>
      </div>
    </>
  );
}
