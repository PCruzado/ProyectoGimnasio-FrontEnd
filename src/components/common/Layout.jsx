import { Outlet } from "react-router";
import NavbarGym from "./NavbarGym";
import FooterGym from "./FooterGym";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* Navbar fijo en la parte superior */}
      <NavbarGym />

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

