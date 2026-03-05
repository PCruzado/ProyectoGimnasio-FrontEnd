import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  // Traemos el usuario del storage para validar el rol
  const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));

  // Si no hay usuario o no es admin, lo mandamos a casa
  if (!loggedUser || loggedUser.rol !== "administrador") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;