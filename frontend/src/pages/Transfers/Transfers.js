import { useEffect, useState } from 'react';
import './Transfers.css';

const Transfers = ({ is_superuser, id_user }) => {
  const [transfers, setTransfers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    fetchTransfers();
  }, [startDate, endDate, senderName]);

  const fetchTransfers = async () => {
    try {
        let url = 'http://localhost:8000/api/v1/transaction/';
        let queryParams = [];

        if (startDate && endDate) {
            queryParams.push(`created_at_after=${startDate}T00:00:00Z`);
            queryParams.push(`created_at_before=${endDate}T23:59:59Z`);
        }

        if (!is_superuser) {
            queryParams.push(`sender_id=${id_user}`);
            queryParams.push(`receiver_id=${id_user}`);
        }

        if (senderName) {
            queryParams.push(`sender_name=${senderName}`);
        }

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            },
        });

        const data = await response.json();
        setTransfers(data);
    } catch (error) {
        console.error('Erro ao obter as transferências:', error);
    }
  };

  const formatDate = (isoDate) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(isoDate).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="transfers-container">
      <h2>Transferências</h2>

        <div className="filters">
            {is_superuser ? 
                (
                <label>
                    Pesquisar:
                    <input 
                        type="text" 
                        value={senderName} 
                        onChange={(e) => setSenderName(e.target.value)} 
                        placeholder="Digite o nome do remetente"
                    />
                </label>
                ) : <></>
            }
            <label>
            Data Início:
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            </label>
            <label>
            Data Fim:
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            </label>
        </div>

      <table className="transfers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Remetente</th>
            <th>Destinatário</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transfers.length > 0 ? (
            transfers.map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.id}</td>
                <td>{transfer.sender_name}</td>
                <td>{transfer.receiver_name}</td>
                <td>R${parseFloat(transfer.amount).toFixed(2)}</td>
                <td>{formatDate(transfer.created_at)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma transferência encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transfers;