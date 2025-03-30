import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = ({ id_user, username, onLogout }) => {
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/wallet/balance/${id_user}/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });
        
        const data = await response.json();

        setWalletBalance(data.balance);
      } catch (error) {
        console.error("Erro ao obter o saldo da carteira:", error);
      }
    };

    fetchWalletBalance();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt />
        </button>
      </div>
      <div className="header-right">
        {walletBalance !== null && (
          <span className="wallet-balance">Saldo da Carteira: R${walletBalance}</span>
        )}
        <span>Usuário: {username}</span>
      </div>
    </header>
  );
};

export default Header;
