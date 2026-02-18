import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './components/pages/Home';
import PlanDetail from './components/pages/PlanDetail';
import Error404 from './components/pages/Error404';
import Layout from './components/common/Layout'; // Para Navbar y Footer constantes

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
      // Aquí tus compañeros del front sumarán Login, Registro, etc.
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;