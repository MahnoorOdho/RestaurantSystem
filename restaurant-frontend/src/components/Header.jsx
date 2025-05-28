import { Link } from "react-router-dom";

const Header = () => (
  <nav className="bg-orange-500 text-white p-4 flex gap-6 justify-center">
    <Link to="/">Menu</Link>
    <Link to="/orders">Orders</Link>
    <Link to="/reservations">Reservations</Link>
  </nav>
);

export default Header;
