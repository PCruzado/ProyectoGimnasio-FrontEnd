import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import NavbarGym from "./NavbarGym";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import FooterGym from "./FooterGym";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  // 1. Estados independientes para cada modal
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null); // Estado global del usuario
  const navigate = useNavigate();

  // Al montar el componente, verificamos si ya hay una sesión activa
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-rolling-gym");
    setUser(null);
    navigate("/"); // Redirigimos al inicio al cerrar sesión
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* Pasamos user y handleLogout al Navbar */}
      <ScrollToTop />
      <NavbarGym
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <FooterGym />

      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onSuccess={(userData) => setUser(userData)} // El modal nos avisa cuando hay éxito
      />

      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
};

export default Layout;
