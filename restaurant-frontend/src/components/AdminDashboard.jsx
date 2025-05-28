import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import BackgroundSlider from './BackgroundSlider';
import { API_URL } from '../config';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ name: "", price: "", description: "" });
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = React.useRef(null);

  const fetchData = async () => {
    try {
      const [menuRes, ordersRes, resvRes] = await Promise.all([
        axios.get(`${API_URL}/api/menu`),
        axios.get(`${API_URL}/api/orders`),
        axios.get(`${API_URL}/api/reservation`),
      ]);
      setMenuItems(menuRes.data);
      setOrders(ordersRes.data);
      setReservations(resvRes.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteMenuItem = async (id) => {
    await axios.delete(`${API_URL}/api/menu/${id}`);
    fetchData();
  };

  const deleteReservation = async (id) => {
    await axios.delete(`${API_URL}/api/reservation/${id}`);
    fetchData();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`${API_URL}/api/orders/${id}`);
    fetchData();
  };

  const startEdit = (item) => {
    setEditingMenuItem(item._id);
    setUpdatedItem({ name: item.name, price: item.price, description: item.description });
  };

  const handleEditChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    await axios.put(`${API_URL}/api/menu/${editingMenuItem}`, updatedItem);
    setEditingMenuItem(null);
    fetchData();
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.name || !newMenuItem.price || !selectedImage) {
      alert('Please fill all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', newMenuItem.name);
    formData.append('price', newMenuItem.price);
    formData.append('description', newMenuItem.description || '');
    formData.append('image', selectedImage);

    try {
      await axios.post(`${API_URL}/api/menu`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewMenuItem({ name: '', price: '', description: '' });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchData();
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  return (
    <><BackgroundSlider />
    <div className="admin-dashboard">
      <h1 className="admin-header">Admin Dashboard</h1>
      
      {/* Add New Menu Item Form */}
      <div className="card add-menu-form">
        <h2 className="section-header">Add New Menu Item</h2>
        <form onSubmit={handleAddMenuItem} className="menu-form">
          <div className="form-group">
            <label htmlFor="item-name">Item Name</label>
            <input
              type="text"
              id="item-name"
              placeholder="Enter item name"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="item-price">Price (Rs)</label>
            <input
              type="number"
              id="item-price"
              placeholder="Enter price"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="item-description">Description</label>
            <input
              type="text"
              id="item-description"
              placeholder="Enter description"
              value={newMenuItem.description}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="item-image">Image</label>
            <input
              type="file"
              id="item-image"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>
          
          <button type="submit" className="btn btn-submit">
            Add Item
          </button>
        </form>
      </div>

      {/* MENU ITEMS */}
      <h2 className="section-header">Menu Items</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-card">
            {editingMenuItem === item._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={updatedItem.name}
                  onChange={handleEditChange}
                  className="form-input"
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="price"
                  value={updatedItem.price}
                  onChange={handleEditChange}
                  className="form-input"
                  placeholder="Price"
                />
                <textarea
                  name="description"
                  value={updatedItem.description}
                  onChange={handleEditChange}
                  className="form-input"
                  placeholder="Description"
                />
                <button onClick={saveEdit} className="btn btn-save">Save</button>
              </div>
            ) : (
              <>
                <img 
                  src={`${API_URL}/uploads/${item.image}`} 
                  alt={item.name} 
                  className="menu-image" 
                />
                <h3 className="item-name">{item.name}</h3>
                <p>{item.description}</p>
                <p className="item-price">Rs {item.price}</p>
                <div className="mt-2">
                  <button 
                    onClick={() => startEdit(item)} 
                    className="btn btn-edit mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteMenuItem(item._id)} 
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h2 className="section-header">Orders</h2>
      <div className="overflow-x-auto">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Item ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const item = menuItems.find((m) => m._id === order.itemId);
              const price = item ? item.price * order.quantity : "N/A";
              return (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.itemId}</td>
                  <td>{order.quantity}</td>
                  <td>{price !== "N/A" ? `Rs ${price}` : "Item Not Found"}</td>
                  <td>
                    <button
                      onClick={() => alert(`Address: ${order.address}`)}
                      className="btn btn-view"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* RESERVATIONS */}
      <h2 className="section-header">Reservations</h2>
      <ul className="reservation-list">
        {reservations.map((res) => (
          <li key={res._id} className="reservation-item">
            <div>
              <p><strong>Name:</strong> {res.name}</p>
              <p><strong>Email:</strong> {res.email}</p>
              <p><strong>Date:</strong> {res.date}</p>
              <p><strong>Time:</strong> {res.time}</p>
            </div>
            <button
              onClick={() => deleteReservation(res._id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default AdminDashboard;