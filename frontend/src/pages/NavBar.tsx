import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const NavBar = () => {
  return (
    <div className="bg-sky-200">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Authenticate</Link>
          </li>
          <li>
            <Link to="/products">Your products</Link>
          </li>
          <li>
            <Link to="/allProducts">View all products on marketplace</Link>
          </li>
          <li>
            <Link to="/analytics">
              View analytics of quantities of your products selled
            </Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
