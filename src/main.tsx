import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.scss'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App />
    )
  }
], {
  basename: import.meta.env.BASE_URL
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
