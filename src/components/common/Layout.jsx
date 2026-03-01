import React, { useState } from "react";
import { Outlet } from "react-router"; // O "react-router" dependiendo de tu versión
import NavbarGym from "./NavbarGym";
import FooterGym from "./FooterGym";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Layout = () => {
  // 1. Estados independientes para cada modal
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 2. Funciones de control cruzado
  const handleOpenLogin = () => {
    setShowRegister(false); // Cerramos el otro por las dudas
    setShowLogin(true);
  };

  const handleOpenRegister = () => {
    setShowLogin(false); // Cerramos el otro por las dudas
    setShowRegister(true);
  };

  const handleCloseAll = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* 3. Le pasamos la función al Navbar que me mostraste */}
      <NavbarGym onLoginClick={handleOpenLogin} />

      {/* Aquí se renderizan las páginas (Home, Nosotros, Detalle) */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      <FooterGym />

      {/* 4. Montamos los modales globales */}
      <LoginModal 
        show={showLogin} 
        handleClose={handleCloseAll} 
        onSwitchToRegister={handleOpenRegister} 
      />
      
      <RegisterModal 
        show={showRegister} 
        handleClose={handleCloseAll} 
        onSwitchToLogin={handleOpenLogin} 
      />
    </div>
  );
};

export default Layout;