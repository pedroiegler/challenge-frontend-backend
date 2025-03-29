# 🚀 Projeto CredutPay | challenge-backend-credutpay

Este projeto é uma aplicação web construída com **Python e Django** no backend e **(preencher tecnologia do frontend, se aplicável)** no frontend.

## 📌 Informações sobre o projeto  
1. Desenvolvido com **Python**, utilizando **Django** e **Django REST Framework**.  
2. Implementa autenticação **JWT**, exigindo o envio do token no formato **Bearer** nas requisições.  
3. Utiliza **PostgreSQL** como banco de dados, com **PgAdmin** para gerenciamento.  
4. Todas as APIs seguem os padrões **RESTful**.  
5. Inclui um script para **popular o banco de dados** com dados fictícios para demonstração.  
6. Contém **testes automatizados**, garantindo a estabilidade e segurança do sistema.  

---

## 🛠 Requisitos  

Antes de começar, certifique-se de ter os seguintes requisitos instalados:  

- [Python 3.9+](https://www.python.org/downloads/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [PgAdmin](https://www.pgadmin.org/download/)  
- [Git](https://git-scm.com/)  

Agora, clone o repositório:  

```bash
# Via SSH
git clone git@github.com:pedroiegler/challenge-backend-credutpay.git

# Via HTTPS
git clone https://github.com/pedroiegler/challenge-backend-credutpay.git
```

---

## ⚙️ Configuração do Backend (Python/Django)  

Acesse o diretório do backend e siga os passos abaixo:  

1️⃣ **Crie e ative um ambiente virtual:**  
```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
```

2️⃣ **Instale as dependências:**  
```bash
pip install -r requirements.txt
```

3️⃣ **Configure as variáveis de ambiente:**  
```bash
cp .env.example .env
```
> **Edite o arquivo `.env` conforme necessário.**  

4️⃣ **Execute as migrações iniciais:**  
```bash
python manage.py migrate
```

5️⃣ **Popule o banco de dados com dados fictícios:**  
```bash
python manage.py shell < populate_db.py
```

### 📌 Dados populados  
O script cadastra **3 usuários** (1 admin e 2 clientes), já com carteiras e uma transação de exemplo.  

- **Usuário 1 (Admin)**  
  - `username: admin_demo`  
  - `senha: admin123`  
  - **Permissão:** pode gerenciar usuários.  

- **Usuário 2 (Cliente)**  
  - `username: cliente1`  
  - `senha: cliente123`  

- **Usuário 3 (Cliente)**  
  - `username: cliente2`  
  - `senha: cliente123`  

6️⃣ **Inicie o servidor Django:**  
```bash
python manage.py runserver
```

---

## 🔧 Scripts úteis  

### ✅ Executar testes automatizados  
```bash
pytest
```

### 📌 Gerar diagrama do banco de dados  

Os diagramas já foram gerados e estão disponíveis no diretório `backend/db`.  

- **Diagrama Simples:**  
  ```bash
  python manage.py graph_models wallet -g -o models.png
  ```  
- **Diagrama Completo:**  
  ```bash
  python manage.py graph_models -a -o models.png
  ```

### 🛠 Gerenciar migrações  
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations
```

---

## 🛠 Tecnologias utilizadas  

- **Backend:**  
  - Python  
  - Django  
  - Django REST Framework  
  - PostgreSQL  
  - PgAdmin  

- **Frontend (se houver)**  
  - *(Preencher tecnologia utilizada no frontend, como React, Vue.js, etc.)*  

---

## 📬 Contato  

Caso tenha dúvidas, entre em contato:  

📧 E-mail: [pedroiegler1601@outlook.com](mailto:pedroiegler1601@outlook.com)  