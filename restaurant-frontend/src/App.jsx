import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_URL } from './config';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuForm from "./components/MenuForm";
import OrderForm from "./components/OrderForm";
import ReservationForm from "./components/ReservationForm";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        console.log("", data);
        setMessage(data.message || "");
      })
      .catch((err) => {
        console.error("Error fetching from backend:", err);
        setMessage("Failed to connect to backend.");
      });
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main-content p-6 text-center">
        <Routes>
          <Route path="/" element={<Home message={message} />} />
          <Route path="/menu" element={<MenuForm />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/reservation" element={<ReservationForm />} />
           <Route path="/contact" element={<ContactForm />} />
           <Route path="/admin" element={<AdminDashboard />} />
           

        </Routes>
      </div>
    </Router>
  );
}

export default App;
