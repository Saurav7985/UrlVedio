import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <Toaster position="top-right" />
    <App />
=======
    <App />
    <Toaster position="top-right" />
>>>>>>> 73df42b4650c21212f25e01e40759a8480d27532
  </StrictMode>,
)