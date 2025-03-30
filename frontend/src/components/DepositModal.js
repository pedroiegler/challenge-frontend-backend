const DepositModal = ({ showModal, depositAmount, setDepositAmount, onDeposit, onClose }) => {
  if (!showModal) return null;

  return (
    <div className="deposit-modal">
      <div className="deposit-modal-content">
        <h3>Depositar</h3>
        <input
          type="number"
          placeholder="Digite o valor..."
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <div className="flex">
          <button onClick={onDeposit} className="deposit-confirm-btn">
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

export default DepositModal;