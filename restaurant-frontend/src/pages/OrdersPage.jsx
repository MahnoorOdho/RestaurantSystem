import { useState } from "react";

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    menuItem: "",
    quantity: 1,
  });

  const menuItems = ["Pizza", "Burger", "Pasta", "Salad"]; // You can fetch or pass this dynamically

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed for ${form.quantity} x ${form.menuItem} by ${form.name}`);
    // Here you would send data to backend
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          required
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          required
          name="menuItem"
          value={form.menuItem}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select Menu Item</option>
          {menuItems.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <input
          required
          type="number"
          min="1"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md font-semibold hover:bg-orange-700 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
