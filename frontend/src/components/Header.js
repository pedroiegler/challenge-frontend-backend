import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import WalletBalance from "./WalletBalance";
import CreateUserModal from "./CreateUserModal";
import TransferModal from "./TransferModal";
import DepositModal from "./DepositModal";
import { fetchUsers, deposit, createUser, transfer } from "../services/api";
import "./style.css";

const Header = ({ id_user, username, is_superuser, onLogout }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        const usersData = await fetchUsers(authToken);
        setUsers(usersData);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    loadUsers();
  }, [id_user]);

  const handleDeposit = async () => {
    const authToken = localStorage.getItem("auth-token");
    const result = await deposit(depositAmount, id_user, authToken);

    if (result.success) {
      alert("Depósito realizado com sucesso!");
      setShowDepositModal(false);
      setDepositAmount("");
      window.location.reload();
    } else {
      alert(result.errorMessage);
    }
  };

  const handleTransfer = async (depositAmount, id_user_sender, id_user_receiver) => {
    const result = await transfer(depositAmount, id_user_sender, id_user_receiver);

    if (result.success) {
      alert("Transferência realizada com sucesso!");      
      window.location.reload();
    } else {
      if(result.errorMessage){
        alert("Valor insuficiente para transferir!");
      } else{
        alert("Erro ao realizar a transferência. Tente novamente.");
      }
    }
  };

  const handleCreateUser = async (userData) => {
    const authToken = localStorage.getItem("auth-token");
    const result = await createUser(userData, authToken);

    if (result.success) {
      alert("Usuário criado com sucesso!");
      setShowCreateUserModal(false);
    } else {
      alert(result.errorMessage);
    }
  };

  return (
    <header className="header">
      <div className="header-in">
        <div className="header-left">
          <button onClick={onLogout} className="logout-btn">
            <FaSignOutAlt />
          </button>
        </div>
        <div className="header-center">
          <WalletBalance id_user={id_user} />
          <button className="transfer-deposit-btn" onClick={() => setShowDepositModal(true)}>Depositar</button>
          <button className="transfer-deposit-btn" onClick={() => setShowTransferModal(true)}>Transferir</button>
        </div>
        <div className="header-right">
          <span>Usuário: {username} {is_superuser ? "(Administrador)" : ""}</span>
          {is_superuser ? 
            (
              <button className="create-user-btn" onClick={() => setShowCreateUserModal(true)}>Criar Usuário</button>
            ) : <></>
          }
        </div>

        <DepositModal 
          showModal={showDepositModal} 
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
          onDeposit={handleDeposit}
          onClose={() => setShowDepositModal(false)} 
        />

        <TransferModal 
          showModal={showTransferModal} 
          onClose={() => setShowTransferModal(false)} 
          users={users}
          id_user={id_user}
          onTransfer={handleTransfer} 
        />

        {showCreateUserModal && (
          <CreateUserModal onClose={() => setShowCreateUserModal(false)} onCreateUser={handleCreateUser} />
        )}
      </div>
    </header>
  );
};

export default Header;
