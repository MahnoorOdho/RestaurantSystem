import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../config';

function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/menu`).then((res) => setMenu(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-orange-600">
        Our Delicious Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menu.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={item.image || "https://via.placeholder.com/400x250?text=No+Image"}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-orange-600 font-bold text-lg">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
