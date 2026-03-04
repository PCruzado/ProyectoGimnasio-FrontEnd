import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  // Por ahora simulamos la autenticación con el localStorage
  // Tus compañeros del back guardarán aquí el token o el usuario
  const user = JSON.parse(localStorage.getItem("user-rolling-gym"));

  // Si no hay usuario o no es admin, lo mandamos a la Home
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Si es admin, lo dejamos pasar al panel
  return children;
};

export default ProtectedRoute;