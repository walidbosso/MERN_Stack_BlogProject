import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // b-4 = bottom 4px, position fixed
    <nav className="border-b-4 border-green-700 text-center fixed top-0 bg-green-600 font-bold w-full text-lg text-white">
      <ul>
        {/* padding axis y */}
        <li className="inline-block py-4">
          <Link to="/" className="pl-6 pr-8">
            Home
          </Link>
        </li>
        <li className="inline-block py-4">
          <Link to="/about" className="pl-6 pr-8">
            About
          </Link>
        </li>
        <li className="inline-block py-4">
          <Link to="/articles-list" className="pl-6 pr-8">
            Aritcles
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
