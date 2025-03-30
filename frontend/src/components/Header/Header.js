import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = ({ id_user, username, onLogout }) => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);

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

  const handleDeposit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/wallet/deposit/${id_user}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ balance: depositAmount }),
      });

      if (response.ok) {
        alert("Depósito realizado com sucesso!");
        setShowDepositModal(false);
        setDepositAmount("");

        const updatedData = await response.json();

        setWalletBalance(updatedData.new_balance);
      } else {
        alert("Erro ao realizar depósito. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição de depósito:", error);
      alert("Erro na requisição de depósito. Tente novamente.");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button onClick={onLogout} className="logout-btn">
          <FaSignOutAlt />
        </button>
      </div>
      <div className="header-center">
        {walletBalance !== null && (
          <span className="wallet-balance">Saldo da Carteira: R${parseFloat(walletBalance).toFixed(2)}</span>
        )}
        <button
          className="deposit-btn"
          onClick={() => setShowDepositModal(true)}
        >
          Depositar
        </button>
      </div>
      <div className="header-right">
        <span>Usuário: {username}</span>
      </div>

      {showDepositModal && (
        <div className="deposit-modal">
          <div className="deposit-modal-content">
            <h3>Fazer Depósito</h3>
            <input
              type="number"
              placeholder="Digite o valor..."
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <div className="flex">
              <button onClick={handleDeposit} className="deposit-confirm-btn">
                Confirmar
              </button>
              <button
                onClick={() => setShowDepositModal(false)}
                className="deposit-cancel-btn"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
