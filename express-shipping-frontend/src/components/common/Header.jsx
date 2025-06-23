import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">
        ExpressShipping
      </Link>
      <nav className="space-x-4">
        <a href="#about" className="text-gray-700 hover:text-primary">
          About
        </a>
        <a href="#services" className="text-gray-700 hover:text-primary">
          Services
        </a>
        <a href="#contact" className="text-gray-700 hover:text-primary">
          Contact
        </a>
        <Link
          to="/login"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
