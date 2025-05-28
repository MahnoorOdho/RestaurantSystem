import React, { useState, useEffect } from "react";
import './MenuForm.css'; // Use the new CSS file
import BackgroundSlider from './BackgroundSlider';
import { API_URL } from '../config';

function MenuForm() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <><BackgroundSlider />
    <div className="menu-form-container">
      <h2 className="menu-title">Full Menu List</h2>
      
      <div className="menu-grid-fix">
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <div key={item._id || item.id} className="menu-card-fix">
              <div className="menu-img-container">
                {item.image ? (
                  <img
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.name}
                    className="menu-img-fix"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('no-image-fallback');
                      e.target.parentElement.textContent = 'No Image';
                    }}
                  />
                ) : (
                  <div className="no-image-fallback">No Image</div>
                )}
              </div>
              <div className="menu-content-fix">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-desc">
                  {item.description || 'No description available'}
                </p>
                <div className="menu-price-fix">Rs {item.price}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="error-message">No menu items found</div>
        )}
      </div>
    </div>
    </>
  );
}

export default MenuForm;