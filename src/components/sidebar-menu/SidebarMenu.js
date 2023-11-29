import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SidebarMenu = () => {
  return (
    <div>
      <div className="top fs-3 text-center">Admin CMS</div>
      <hr />
      <div className="list">
        <ul className="list-unstyled fw-bolder sidebar-menu">
          <li>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/category" className="nav-link">
              Category
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-link">
              Product
            </Link>
          </li>
          <li>
            <Link to="/payment-option" className="nav-link">
              Payment Option
            </Link>
          </li>
          <li>
            <Link to="/order" className="nav-link">
              Order
            </Link>
          </li>
          <li>
            <Link to="/review" className="nav-link">
              Revies
            </Link>
          </li>
          <li>
            <Link to="/buyer" className="nav-link">
              Buyer
            </Link>
          </li>
          <li>
            <Link to="/register" className="nav-link">
              Create New admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
