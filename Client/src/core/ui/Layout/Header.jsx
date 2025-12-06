import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Asumiendo que usas react-router

// Context
import useAuth from "../../../features/auth/hooks/useAuth";

// Components
import Button from "../Components/Button";
import UserMenu from "./UserMenu";

export default function Header({ showOptions, children }) {
  const { user, loading } = useAuth(); // 'loading' no es estrictamente necesario aquí si el layout lo maneja
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if(loading) return 'Cargando contenido...';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-300 relative z-50">
      <div className="w-11/12 md:max-w-6xl mx-auto p-5 flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-main-gradient text-transparent bg-clip-text select-none cursor-pointer" onClick={() => navigate("/")}>
          VitaLink
        </h1>

        <div className="flex gap-5">
          { user?.id && (
            // AQUI USAMOS EL NUEVO COMPONENTE
            <div className="md:ml-4 md:hidden">
              <UserMenu user={user} />
            </div>
          )}

          {/* Botón Hamburguesa */}
          <button 
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center md:hidden w-10 h-10 gap-1.5 focus:outline-none z-50"
            aria-label="Abrir menú"
          >
            <span className={`h-1 w-8 bg-main-gradient rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`h-1 w-8 bg-main-gradient rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-1 w-8 bg-main-gradient rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>

          {/* Navegación */}
          <nav 
            className={`
              absolute top-full left-0 w-full bg-white border-b border-gray-200 p-5 shadow-lg flex flex-col items-center gap-5 transition-all duration-300 ease-in-out
              md:static md:w-auto md:bg-transparent md:border-none md:shadow-none md:flex md:flex-row md:p-0
              ${isOpen ? "flex opacity-100" : "hidden opacity-0 md:flex md:opacity-100"}
              `}
          >
            {children}

            {/* Lógica de Autenticación */}
            { user?.id ? (
                // AQUI USAMOS EL NUEVO COMPONENTE
                <div className="hidden md:block md:ml-4">
                  <UserMenu user={user} />
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-4 md:ml-4">
                  <a className="font-light text-gray-500 hover:text-gray-800 transition-colors" href="/auth/signup">
                    Crear Cuenta
                  </a>
                  <p>{console.log(showOptions)}</p>
                  <Button
                      text="Iniciar Sesión"
                      type="button"
                      variant="secondary"
                      onClick={() => navigate("/auth")} 
                  />
                </div> 
              )}
          </nav>
        </div>
      </div>
    </header>
  );
}