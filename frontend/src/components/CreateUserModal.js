import { useState } from "react";

const CreateUserModal = ({ onClose, onCreateUser }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
      first_name: firstName,
      last_name: lastName,
      is_superuser: isAdmin,
    };
    onCreateUser(userData);
  };

  return (
    <div className="create-user-modal">
      <div className="create-user-modal-content">
        <h3>Criar Novo Usuário</h3>
        <form onSubmit={handleSubmit}>
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
              type="button"
              onClick={onClose}
              className="create-user-btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;