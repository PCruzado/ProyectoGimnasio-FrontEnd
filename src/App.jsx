import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/pages/Home";
import PlanDetail from "./components/pages/PlanDetail";
import Error404 from "./components/pages/Error404";
import Layout from "./components/common/Layout";
import AboutUs from "./components/pages/AboutUs";
import Admin from "./components/pages/Admin";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import StaffDetail from "./components/pages/StaffDetail";
import ProductDetail from "./components/pages/ProductDetail";
import Contact from "./components/pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
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
      {
        path: "contacto",
        element: <Contact />,
      },
      {
        path: "staff/:id",
        element: <StaffDetail />,
      },
      {
        path: "producto/:id",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
