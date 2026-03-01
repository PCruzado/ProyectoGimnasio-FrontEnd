import { useState } from "react";
import { Outlet } from "react-router";
import NavbarGym from "./NavbarGym";
import FooterGym from "./FooterGym";
import LoginModal from "./LoginModal";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* Navbar fijo en la parte superior */}
      <NavbarGym onLoginClick={handleShowLogin} />

      {/* Modal de Login */}
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />

      {/* Contenido dinámico de las páginas */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer con información de contacto y redes */}
      <FooterGym />
    </div>
  );
};

export default Layout;
