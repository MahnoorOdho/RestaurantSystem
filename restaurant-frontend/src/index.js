import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './components/ContactForm.css';
import './components/MenuForm.css';
import './components/OrderForm.css';
import './components/ReservationForm.css';
import './components/Navbar.css';
import './components/AdminDashboard.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
