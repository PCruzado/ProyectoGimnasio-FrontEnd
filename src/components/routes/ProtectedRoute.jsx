import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user-rolling-gym"));

  if (!loggedUser || loggedUser.rol !== "administrador") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
