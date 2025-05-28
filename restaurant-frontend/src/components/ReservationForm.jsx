import React, { useState } from "react";
import axios from "axios";
import "./ReservationForm.css";
import BackgroundSlider from './BackgroundSlider';
 // Custom CSS file

function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reservation", {
        name,
        email,
        date,
        time,
        guests: parseInt(guests),
      });
      alert("Reservation made successfully!");
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setGuests(1);
    } catch (error) {
      alert("Failed to make reservation.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
    
    <div className="reservation-container">
      <BackgroundSlider />
      <form onSubmit={handleSubmit} className="reservation-form">
        <h2 className="form-title">Make a Reservation</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="number"
          min="1"
          max="20"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />

        <button type="submit">Reserve</button>
      </form>
    </div>
    </>
  );
}

export default ReservationForm;
