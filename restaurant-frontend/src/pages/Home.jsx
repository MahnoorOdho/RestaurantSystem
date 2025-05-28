import React, { useState, useEffect } from "react";
import './Home.css';

const images = [
  "/images.jpeg",
  "/images1.avif",
  
  "/images5.webp",
  "/images6.jpg",
  "/images7.jpg"
];

function Home({ message }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <h1 className="home-title">Welcome to Our Restaurant</h1>
      <p className="home-message"> {message}</p>

      <div className="slider">
        <img src={images[currentIndex]} alt="restaurant" className="slider-image" />
      </div>
    </div>
  );
}

export default Home;
