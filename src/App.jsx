import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/pages/Home";
import PlanDetail from "./components/pages/PlanDetail";
import Error404 from "./components/pages/Error404";
import Layout from "./components/common/Layout"; // Para Navbar y Footer constantes
import AboutUs from "./components/pages/AboutUs"; // Página del equipo
import Admin from "./components/pages/Admin"; // Panel de administración
import ProtectedRoute from "./components/routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Este componente tiene el Navbar, Footer y el <Outlet />
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "detalle-plan/:id",
        element: <PlanDetail />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "nosotros",
        element: <AboutUs />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
