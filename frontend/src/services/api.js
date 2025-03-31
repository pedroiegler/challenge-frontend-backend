export const fetchUsers = async (authToken) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao obter usuários');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      throw error;
    }
};

export const deposit = async (depositAmount, id_user, authToken) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/wallet/deposit/${id_user}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ balance: depositAmount }),
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, errorMessage: "Erro ao realizar depósito. Tente novamente." };
      }
    } catch (error) {
      console.error("Erro na requisição de depósito:", error);
      return { success: false, errorMessage: "Erro na requisição de depósito. Tente novamente." };
    }
};

export const createUser = async (userData, authToken) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, errorMessage: errorData.error || "Erro ao criar usuário." };
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return { success: false, errorMessage: "Erro na requisição de criação de usuário. Tente novamente." };
    }
};
  
export const transfer = async (depositAmount, id_user_sender, id_user_receiver) => {
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
            return { success: true };
        } else {
            const errorData = await response.json();
            return { success: false, errorMessage: errorData.error || "Erro ao transferir." };
        }
    } catch (error) {
        console.error("Erro ao criar transferir:", error);
        return { success: false, errorMessage: "Erro na requisição de transferência. Tente novamente." };
    }
};