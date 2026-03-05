<<<<<<< HEAD
import { Outlet } from "react-router";
import NavbarGym from "./NavbarGym";
import FooterGym from "./FooterGym";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* Navbar fijo en la parte superior */}
      <NavbarGym />

      {/* Contenido dinámico de las páginas */}
=======
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import NavbarGym from "./NavbarGym";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import FooterGym from "./FooterGym";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-rolling-gym");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <ScrollToTop />
      <NavbarGym
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

>>>>>>> dev
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
        onSuccess={(userData) => setUser(userData)}
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

