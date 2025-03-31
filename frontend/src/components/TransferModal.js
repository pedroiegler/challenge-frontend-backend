import { useState } from "react";

const TransferModal = ({ showModal, onClose, users, id_user, onTransfer }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleTransfer = () => {
    if (depositAmount && selectedUser) {
      onTransfer(depositAmount, id_user, selectedUser);
    }
  };

  if (!showModal) return null;

  return (
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
            onClick={handleTransfer}
            className="deposit-confirm-btn"
            disabled={!depositAmount || !selectedUser}
          >
            Confirmar
          </button>
          <button onClick={onClose} className="deposit-cancel-btn">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
