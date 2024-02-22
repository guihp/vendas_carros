
import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import NovoCarro from "./pages/dashboard/novo"
import Detalhes from "./pages/carros"
import { Layout } from "./components/layout"
import { Private } from "./routes/Private"


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/carro/:id',
        element: <Detalhes />
      },
      {
        path: '/dashboard',
        element: <Private> <Dashboard /> </Private>  
      },
      {
        path: '/dashboard/novo',
        element:  <Private> <NovoCarro/> </Private>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

export { router };