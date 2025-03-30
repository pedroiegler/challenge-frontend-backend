import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = ({ id_user, username, is_superuser, onLogout }) => {
  const [walletBalance, setWalletBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

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

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("auth-token")}`,
          },
        });

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao obter usuários:", error);
      }
    };

    fetchUsers();
    fetchWalletBalance();
  }, [id_user]);

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

  const handleTransfer = async (depositAmount, id_user_sender, id_user_receiver) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/wallet/transfer/${id_user_sender}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ amount: depositAmount, receiver_id: id_user_receiver}),
      });

      if (response.ok) {
        alert("Transferência realizada com sucesso!");
        setShowTransferModal(false);
        setDepositAmount("");
        window.location.reload();
      } else {
        const errorData = await response.json();
        if(errorData.error){
          alert("Valor insuficiente para transferir!");
        } else{
          alert("Erro ao realizar a transferência. Tente novamente.");
        }
      }
    } catch (error) {
      console.error("Erro na requisição de transferência:", error);
      alert("Erro na requisição de transferência. Tente novamente.");
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
          password: newPassword,
          first_name: firstName,
          last_name: lastName,
          is_superuser: isAdmin,
        }),
      });

      if (response.ok) {
        alert("Usuário criado com sucesso!");
        setShowCreateUserModal(false);

        setNewUsername("");
        setNewEmail("");
        setNewPassword("");
        setFirstName("");
        setLastName("");
        setIsAdmin(false);
      } else {
        alert("Erro ao criar usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição de criação de usuário:", error);
      alert("Erro na requisição de criação de usuário. Tente novamente.");
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
          {walletBalance !== null && (
            <span className="wallet-balance">Saldo da Carteira: R${parseFloat(walletBalance).toFixed(2)}</span>
          )}
          <button
            className="transfer-deposit-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Depositar
          </button>
          <button
            className="transfer-deposit-btn"
            onClick={() => setShowTransferModal(true)}
          >
            Transferir
          </button>
        </div>
        <div className="header-right">
          <span>Usuário: {username} {is_superuser ? "(Administrador)" : ""}</span>
          {is_superuser ? 
            (
              <button className="create-user-btn" onClick={() => setShowCreateUserModal(true)}>
                Criar Usuário
              </button>
            ) : <></>
          }
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

        {showTransferModal && (
          <div className="deposit-modal">
            <div className="deposit-modal-content">
              <h3>Transferir</h3>

              <input
                type="number"
                placeholder="Digite o valor..."
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />

              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} className="select-user">
                <option value="">Selecione um usuário</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>

              <div className="flex">
                <button
                  onClick={() => handleTransfer(depositAmount, id_user, selectedUser)}
                  className="deposit-confirm-btn"
                  disabled={!depositAmount || !selectedUser}
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="deposit-cancel-btn"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {showCreateUserModal && (
          <div className="create-user-modal">
            <div className="create-user-modal-content">
              <h3>Criar Novo Usuário</h3>
              <form onSubmit={handleCreateUser}>
                <input
                  type="text"
                  placeholder="Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Primeiro Nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Último Nome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <div className="center-reverse">
                  <span className="span-adm">Administrador</span>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                </div>
                  
                <div className="center">
                  <button type="submit" className="create-user-btn-confirm">
                    Criar Usuário
                  </button>
                  <button
                    onClick={() => setShowCreateUserModal(false)}
                    className="create-user-btn-cancel"
                  >
                    Cancelar
                  </button>
                </div>
              
              </form>
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
