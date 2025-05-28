import React, { useState, useEffect } from "react";
import axios from "axios";
import './OrderForm.css';
import BackgroundSlider from './BackgroundSlider';

function OrderForm() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [orderSummary, setOrderSummary] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderCancelled, setOrderCancelled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(res.data);
      } catch (error) {
        console.error("Failed to load menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedItem) return alert("Please select a menu item.");

  const itemDetails = menuItems.find((item) => item._id === selectedItem);
  const total = itemDetails.price * quantity;

  try {
    await axios.post("http://localhost:5000/api/orders", {
      itemId: selectedItem,
      quantity: parseInt(quantity),
      name,
      email,
      address,
      phone,
    });

    setOrderSummary({
       name,
       email,
       address,
       phone,
       itemName: itemDetails.name,
       itemId: selectedItem,
       quantity,
       price: itemDetails.price,
       total,
       image: itemDetails.image,
    });

    setIsEditing(false);  // <== Add this line here

    // Reset form fields
    setSelectedItem("");
    setQuantity(1);
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
  } catch (error) {
    alert("Failed to place order.");
    console.log(error.response?.data || error.message);
  }
};


  const handleEdit = () => {
  if (!orderSummary) return;

  setName(orderSummary.name);
  setEmail(orderSummary.email);
  setAddress(orderSummary.address);
  setPhone(orderSummary.phone);
  setSelectedItem(orderSummary.itemId);
  setQuantity(orderSummary.quantity);
  setOrderSummary(null); // Hide summary
  setIsEditing(true);    // Set editing mode
};

  const handleCheckout = () => {
    setOrderComplete(true);
    setIsEditing(false);
  };
 const handleCancel = () => {
  console.log("Cancel clicked");
  setOrderSummary(null);
  setOrderCancelled(true);
  setName("");
  setEmail("");
  setAddress("");
  setPhone("");
  setSelectedItem("");
  setQuantity(1);

  // Hide message after 3 seconds
  setTimeout(() => {
    setOrderCancelled(false);
  }, 3000);
  setIsEditing(false);
};





  return (
    <>
      <BackgroundSlider />
      <div className="order-form-container">
        {orderComplete ? (
          <div className="thank-you-message">
            <h2>🎉 Thank you for your order!</h2>
            <p>Your delicious meal is being prepared and will arrive within 45 minutes.</p>
            <p><strong>Need help? Call us: 0311-1118882</strong></p>
          </div>
        ) : (
          <>
          {orderCancelled && (
      <div className="cancel-message" style={{ color: 'crimson', fontWeight: 'bold', margin: '10px 0' }}>
        ❌ Your order has been cancelled.
      </div>
)}

            {!orderSummary || isEditing ? (
              <form onSubmit={handleSubmit} className="order-form">
                <div className="order-form-header">
                  <h2>Place Your Order</h2>
                  <p>Fill in your details to complete your order</p>
                </div>

                <div className="order-form-grid">
                  <div>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Delivery Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="form-group">
                      <label>Menu Item</label>
                      <select
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        required
                      >
                        <option value="">Select an item</option>
                        {menuItems.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name} - Rs {item.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}

                        required
                      />
                    </div>

                    <button type="submit" className="submit-btn">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="order-summary">
                <div className="order-summary-content">
                  <h3>Order Summary</h3>
                  <div className="customer-details">
                    <p><strong>Name:</strong> {orderSummary.name}</p>
                    <p><strong>Email:</strong> {orderSummary.email}</p>
                    <p><strong>Address:</strong> {orderSummary.address}</p>
                    <p><strong>Phone:</strong> {orderSummary.phone}</p>
                  </div>

                  <div className="order-details">
                    <div className="order-item">
                      <span>Item:</span>
                      <span>{orderSummary.itemName}</span>
                    </div>
                    <div className="order-item">
                      <span>Quantity:</span>
                      <span>{orderSummary.quantity}</span>
                    </div>
                    <div className="order-item">
                      <span>Price per item:</span>
                      <span>Rs {orderSummary.price}</span>
                    </div>
                    <div className="order-total">
                      <span>Total:</span>
                      <span>Rs {orderSummary.total}</span>
                    </div>
                  </div>
                </div>

                {orderSummary.image && (
                  <div className="order-summary-image-container">
                    <img
                      src={`http://localhost:5000/uploads/${orderSummary.image}`}
                      alt={orderSummary.itemName}
                      className="order-summary-image"
                    />
                  </div>
                )}

               <div className="order-summary-buttons">
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Confirm & Checkout
                  </button>

                  <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel Order
                  </button>
                  <button type="button" className="edit-btn" onClick={handleEdit}>
                    Edit Order
                  </button>
               </div>

 
              

              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default OrderForm;