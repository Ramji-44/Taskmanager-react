import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <App />
  },
  {
    path : "*",
    element : <NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
    < RouterProvider router={router} />
)
