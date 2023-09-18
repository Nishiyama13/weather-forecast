import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Weather from './pages/Weather'
import Forecast from './pages/Forecast'
const router = createBrowserRouter([
  {
    path: '/weather',
    element: <Weather />,
  },
  {
    path: '/forecast',
    element: <Forecast />,
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
