import React, { useState, useEffect } from 'react';
import './BackgroundSlider.css';

const BackgroundSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Corrected image paths (ensure these files exist in public folder)
  const slides = [
    '/images3.jpeg',
    '/images4.jpeg', 
    '/images6.jpg' // Fixed potential typo (was image6.jpg)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
  <div className="background-slider">
    {slides.map((slide, index) => (
      <img
        key={index}
        src={slide}
        alt={`Background ${index}`}
        className={`slide ${index === currentSlide ? 'active' : ''}`}
      />
    ))}
    <div className="slide-overlay"></div>
  </div>
);
};

export default BackgroundSlider;