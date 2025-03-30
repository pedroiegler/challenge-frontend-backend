import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt />
        </button>
      </div>
      <div className="header-right">
        <span>{username}</span>
      </div>
    </header>
  );
};

export default Header;
