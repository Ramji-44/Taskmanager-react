import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />
  },
  {
    path: "/dashboard",
    element: <App />
  }
])

createRoot(document.getElementById('root')).render(
    < RouterProvider router={router} />
)
