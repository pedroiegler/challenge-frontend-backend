import { useState, useEffect } from "react";

const WalletBalance = ({ id_user }) => {
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
  }, [id_user]);

  if (walletBalance === null) {
    return <span>Carregando saldo...</span>;
  }

  return (
    <span className="wallet-balance">
      Saldo da Carteira: R${parseFloat(walletBalance).toFixed(2)}
    </span>
  );
};

export default WalletBalance;